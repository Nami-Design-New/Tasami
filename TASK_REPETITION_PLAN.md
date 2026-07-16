---
meta:
  contentType: Reference
  audience: Backend implementation agent
  goal: Implement the API and business rules for repeated task schedules
---

# Implement backend support for repeated task schedules

This plan defines the backend contract for repeated tasks, schedule completion, fixed-time reminders, task notes, schedule editing, and schedule regeneration. Treat every item in `schedules` as one dated occurrence of its parent task.

## Required outcome

Implement these rules:

- Create `repeat_count` dated schedules for a repeated task
- Let the task owner edit or delete eligible schedules
- Let the task owner complete a due schedule with one direct request
- Reject schedule completion before the task start date or schedule date
- Keep the parent task incomplete until the owner completes it explicitly
- Schedule reminders at a backend-defined time
- Accept notes as the `task_notes` array
- Regenerate pending schedules without changing protected schedules

The current web interface does not show a schedule status selector or a completion confirmation modal. It shows one completion action when the occurrence becomes due.

## API endpoints

Use these endpoints:

| Operation | Endpoint | Request data |
| --- | --- | --- |
| Create a task | `POST /tasks` | Existing task fields plus repetition and note fields |
| Get task details | `GET /tasks/{taskId}` | No request body |
| Update task fields and repetition settings | `PUT /tasks/{taskId}` | Task fields and optional `schedule_update_mode` |
| Update only the parent task status | `PUT /tasks/{taskId}` | `{ "status": "pending|progress|completed" }` |
| Update a schedule | `PATCH /tasks/{taskId}/schedules/{scheduleId}` | Any supported subset of `date`, `status`, and `is_notify` |
| Delete a schedule | `DELETE /tasks/{taskId}/schedules/{scheduleId}` | No request body |

Do not add a separate endpoint for creating one schedule in this version. Increasing `repeat_count` through the task update endpoint creates additional schedules through regeneration.

## Create task request

The frontend sends repeated tasks in this shape:

```json
{
  "work_id": 793,
  "task_category_id": 19,
  "title": "Daily review",
  "started_at": "2026-07-14",
  "expected_end_date": "2026-07-20",
  "task_notes": ["Review the annual goals document"],
  "is_repeated": 1,
  "repeat_type": "daily",
  "repeat_count": 3,
  "notification_repeat": "none"
}
```

Validate the repetition fields as one group:

- Accept `is_repeated` as `0`, `1`, `false`, or `true`, then normalize it to a boolean
- Require `repeat_type: "daily"` when `is_repeated` is enabled
- Require an integer `repeat_count` from `1` through the available inclusive day count
- Store `repeat_count: 0` when repetition is disabled
- Set every generated schedule status to `pending`
- Generate unique consecutive dates starting from `started_at`
- Reject general notification settings when repetition is enabled
- Require `notification_repeat: "none"` for a repeated task

Calculate the maximum available repetitions with this inclusive formula:

```text
differenceInDays(expected_end_date, started_at) + 1
```

For example, July 14 through July 16 allows three daily schedules.

Create the task, notes, and schedules in one database transaction. Roll back the full operation if any insert fails.

## Task notes contract

Accept `task_notes` as an array of trimmed strings. Reject non-string entries and entries that exceed the backend note length limit. Ignore empty strings or reject them consistently with a `422` field error.

For create and update requests, the frontend sends this shape:

```json
{
  "task_notes": [
    "First note",
    "Second note"
  ]
}
```

Return notes as objects in task details:

```json
{
  "task_notes_count": 2,
  "task_notes": [
    {
      "id": 1,
      "note": "First note",
      "created_at": "2026-07-14 09:30:00"
    }
  ]
}
```

Define update behavior as replacement of the submitted note collection because the current frontend submits the complete array.

## Task details response

`GET /tasks/{taskId}` must return these repetition fields:

- `is_repeated` as a boolean
- `repeat_type`
- `repeat_count`
- `task_notes_count`
- `task_notes`
- `schedules`

Return each schedule in this shape:

```json
{
  "id": 15,
  "date": "2026-07-28",
  "status": "pending",
  "is_notify": false,
  "notify_at": null
}
```

Return schedule dates as `YYYY-MM-DD`. Do not return localized month names because the frontend date field requires the ISO calendar format.

## Complete a schedule

The frontend completes a schedule directly without a confirmation modal:

```http
PATCH /tasks/2132/schedules/15
```

```json
{
  "status": "completed"
}
```

Allow completion only when both conditions are true in the effective user timezone:

- The current calendar date is on or after `task.started_at`
- The current calendar date is on or after `schedule.date`

Reject an early completion with `422` and attach the message to `status`. The frontend disables the action, but the backend must enforce the same rule.

Use date-only comparisons. A schedule becomes eligible at `00:00` on its date in the effective timezone.

Return the updated schedule:

```json
{
  "code": 200,
  "data": {
    "id": 15,
    "date": "2026-07-28",
    "status": "completed",
    "is_notify": false,
    "notify_at": null
  },
  "message": "Schedule completed successfully"
}
```

Completing a schedule must also cancel its queued reminder.

## Schedule status rules

Keep these API values for compatibility:

- `pending`
- `progress`
- `completed`

The current web interface treats `pending` and `progress` as incomplete. It sends only `completed` from the schedule completion action. Existing `progress` schedules can transition to `completed`.

Enforce these transitions:

- `pending` can transition to `progress` or `completed`
- `progress` can transition to `completed`
- `completed` is final

Do not let any client change, delete, or reactivate a completed schedule.

## Parent task status rules

The parent task supports `pending`, `progress`, and `completed`. Use `PUT /tasks/{taskId}` for both status-only updates and general task edits. A status-only request contains only the `status` field.

Enforce these rules when updating the parent task status:

- Reject `progress` or `completed` before `started_at` in the effective timezone
- Reject `completed` while any non-deleted schedule is not `completed`
- Allow the owner to complete the parent task after all schedules are completed
- Do not complete the parent task automatically after the final schedule completes

Completing the final schedule only makes parent task completion eligible. The owner must send a separate task status update.

## Edit a schedule date

Accept date updates in this shape:

```json
{
  "date": "2026-07-28"
}
```

Validate every date update:

- Require `YYYY-MM-DD`
- Allow date changes only for `pending` schedules
- Require the new date to be today or later in the effective timezone
- Require the date to remain between `started_at` and `expected_end_date`, inclusive
- Reject a date already used by another schedule under the same task
- Lock the schedule row or use a transaction to prevent concurrent duplicate dates

Add a database unique constraint for the task and schedule date when the storage model permits it.

If `is_notify` is enabled, reschedule the reminder after the date update. Roll back the date update if reminder rescheduling cannot be recorded safely.

## Delete a schedule

Allow deletion for `pending` and `progress` schedules. Reject deletion for `completed` schedules.

When deleting a schedule:

1. Verify ownership and the task-to-schedule relationship
2. Cancel the queued reminder idempotently
3. Delete or soft-delete the schedule
4. Set `repeat_count` to the remaining non-deleted schedule count
5. Set `is_repeated` to false if no schedules remain
6. Commit the database transaction

Do not create a replacement schedule automatically.

## Fixed-time schedule reminders

The user controls only `is_notify`. The frontend does not send a schedule reminder time.

Accept this request:

```json
{
  "is_notify": true
}
```

Apply these rules:

- Read the reminder time from backend configuration
- Resolve the user timezone first, then fall back to the application timezone
- Calculate `notify_at` from `schedule.date`, the fixed time, and the effective timezone
- Allow reminders only for incomplete schedules
- Require `notify_at` to be in the future
- Return the calculated `notify_at` in the API response
- Cancel the reminder when `is_notify` becomes false
- Cancel the reminder when the schedule becomes completed or deleted
- Reschedule the reminder when an enabled schedule date changes
- Make create, cancel, and reschedule operations idempotent

Dispatch queue work only after the database transaction commits. Use a stable job key such as `task-schedule:{scheduleId}:reminder` to prevent duplicate jobs.

## Update task repetition settings

Updating `title`, `task_category_id`, or `task_notes` must not change schedules.

Send task fields and repetition setting changes through `PUT /tasks/{taskId}`. Do not replace this existing endpoint with `PATCH`.

Treat changes to these fields as schedule configuration changes:

- `started_at`
- `expected_end_date`
- `repeat_count`
- `repeat_type`
- `is_repeated`

The frontend confirms this destructive change, then sends:

```json
{
  "repeat_count": 20,
  "schedule_update_mode": "regenerate_pending"
}
```

When `schedule_update_mode` is `regenerate_pending`, run one transaction:

1. Lock the task and current schedules
2. Preserve `progress` and `completed` schedules
3. Delete pending schedules and cancel their reminder records
4. Validate the new range against every preserved schedule
5. Generate pending schedules on unused dates inside the new range
6. Commit only when the final non-deleted schedule count equals `repeat_count`

Apply these additional rules:

- Reject a range that excludes a preserved schedule
- Reject `repeat_count` below the number of preserved schedules
- Treat `repeat_count` as the total schedule count, not the number of new schedules
- Reject regeneration when the requested count exceeds the available unique dates
- Disable repetition only when every schedule remains `pending`
- Delete all pending schedules when repetition is disabled after frontend confirmation

Queue reminder cancellations and creations after the transaction commits. Preserve data if generation fails.

## Authorization and relationship checks

Apply these checks to every schedule endpoint:

- Authenticate the caller
- Verify that the caller owns the task
- Verify that `scheduleId` belongs to `taskId`
- Keep the helper or assistant role read-only
- Reject changes when the work or task is locked by its parent workflow

Return these status codes:

- `403` for a caller without mutation permission
- `404` when the task or schedule does not exist, or the schedule does not belong to the task
- `409` for a stale state, concurrent update, or final-state conflict
- `422` for field validation, date rules, status rules, count rules, and reminder rules

Return field errors in this shape:

```json
{
  "code": 422,
  "message": "The given data was invalid.",
  "errors": {
    "status": ["This repetition cannot be completed before its date."]
  }
}
```

Use stable field names in `errors`: `date`, `status`, `is_notify`, `repeat_count`, `started_at`, `expected_end_date`, and `task_notes`.

## Transaction and concurrency requirements

Protect all multi-record changes with database transactions and row locks where needed.

Cover these concurrency cases:

- Two requests complete the same schedule
- Two requests move different schedules to the same date
- A schedule update races with task regeneration
- A schedule delete races with reminder dispatch
- Two regeneration requests run for the same task

Make repeated completion idempotent. Returning the current completed schedule is acceptable when the same owner repeats the exact completion request.

## Backend test checklist

Add automated coverage for these cases:

- Create the exact daily schedule count from an inclusive date range
- Reject a count above the available inclusive days
- Accept `task_notes` as an array and return note objects
- Complete a schedule on its date
- Complete an overdue schedule
- Reject completion before `task.started_at`
- Reject completion before `schedule.date`
- Keep the parent task unchanged after the final schedule completes
- Reject parent task completion while one schedule remains incomplete
- Reject parent task progress or completion before `started_at`
- Prevent changes and deletion after schedule completion
- Accept a valid date and reject past, duplicate, malformed, and out-of-range dates
- Enable and disable a fixed-time reminder
- Reject a reminder when its calculated time is not in the future
- Reschedule a reminder after a date change
- Cancel a reminder after completion or deletion
- Regenerate pending schedules while preserving `progress` and `completed`
- Roll back all schedule changes when regeneration fails
- Enforce ownership and task-to-schedule relationships
- Keep concurrent duplicate-date and regeneration operations consistent

## Backend acceptance criteria

The backend work is complete when all conditions pass:

- The documented endpoints return the defined fields and status codes
- A future task or schedule cannot be completed through a direct API request
- A due schedule completes through one `PATCH` request without changing the parent task
- The final schedule completion leaves the parent task awaiting explicit owner completion
- Fixed-time reminders remain server-controlled
- Task notes persist through the `task_notes` array contract
- Regeneration preserves protected schedules and remains transactional
- Automated tests cover the validation, reminder, authorization, and concurrency rules
