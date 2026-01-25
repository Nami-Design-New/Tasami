import { flexRender } from "@tanstack/react-table";
import { Placeholder } from "react-bootstrap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import DraggableRow from "./DraggableRow";

const TableBody = ({ table, columns, rowDnD, dnd, isLoading, pageSize }) => {
  const rows = table?.getRowModel().rows;
  console.log(rows);

  const hasData = rows?.length > 0;

  if (isLoading) {
    return (
      <tbody>
        {Array.from({ length: pageSize }).map((_, i) => (
          <tr key={i}>
            {rowDnD && (
              <td>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                </Placeholder>
              </td>
            )}
            {columns.map((_, c) => (
              <td key={c}>
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (!hasData) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={rowDnD ? columns.length + 1 : columns.length}
            className="text-center py-5 text-muted"
          >
            <i className="fa-regular fa-folder-open fs-2 mb-2 d-block" />
            No Data
          </td>
        </tr>
      </tbody>
    );
  }

  if (rowDnD) {
    const ids = dnd?.dragData?.map((r) => String(r.id));

    return (
      <tbody>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={dnd.handleDragEnd}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {rows.map((row) => (
              <DraggableRow key={row.id} row={row} />
            ))}
          </SortableContext>
        </DndContext>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
