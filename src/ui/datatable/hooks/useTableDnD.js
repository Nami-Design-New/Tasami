import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export const useTableDnD = ({ data, enabled, onReorder }) => {
  const [dragData, setDragData] = useState(data);

  useEffect(() => {
    setDragData(data);
  }, [data]);

  const handleDragEnd = ({ active, over }) => {
    if (!enabled || !over || active.id === over.id) return;

    setDragData((items) => {
      const oldIndex = items.findIndex((i) => String(i.id) === String(active.id));
      const newIndex = items.findIndex((i) => String(i.id) === String(over.id));
      const next = arrayMove(items, oldIndex, newIndex);
      onReorder?.(next);
      return next;
    });
  };

  return { dragData, handleDragEnd };
};
