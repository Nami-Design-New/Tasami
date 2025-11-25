import { useParams } from "react-router";
import useGetCommunityMeetings from "../../hooks/dashboard/subscription/useGetCommunityMeetings";
import MeetingCard from "../../ui/website/communities/meetings/MeetingCard";
import { useState } from "react";
import { PAGE_SIZE } from "../../utils/constants";

export default function DashboardMeetings() {
  const meetings = [
    {
      id: 1,
      title: "Team Standup Meeting",
      desc: "Daily team sync to discuss progress, blockers, and plans for the day.",
      start_date: "2025-11-12",
      start_time: "09:00 AM",
      duration: "30 min",
    },
    {
      id: 2,
      title: "Project Kickoff",
      desc: "Initial meeting to align on project scope, deliverables, and timelines.",
      start_date: "2025-11-13",
      start_time: "11:00 AM",
      duration: "1 hr",
    },
    {
      id: 3,
      title: "Client Review Meeting",
      desc: "Meeting with the client to review progress and gather feedback.",
      start_date: "2025-11-14",
      start_time: "02:00 PM",
      duration: "45 min",
    },
    {
      id: 4,
      title: "Design Workshop",
      desc: "Collaborative session to brainstorm and finalize UI/UX designs.",
      start_date: "2025-11-15",
      start_time: "10:00 AM",
      duration: "1.5 hr",
    },
    {
      id: 5,
      title: "Sprint Retrospective",
      desc: "Team reflects on the last sprint, discusses improvements for the next one.",
      start_date: "2025-11-16",
      start_time: "04:00 PM",
      duration: "1 hr",
    },
  ];
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { communityMeetings, currentPage, lastPage, isLoading } =
    useGetCommunityMeetings("", page, pageSize, id);
  console.log("communityMeetings ::", communityMeetings);

  return (
    <section className="meeting-section">
      <div className="mettings-list">
        <div className="row">
          {communityMeetings?.map((item) => (
            <div className="col-12 p-2" key={item.id}>
              <MeetingCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
