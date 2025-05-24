import { OverlayTrigger, Popover } from "react-bootstrap";
import InputField from "../../ui/forms/InputField";

const STATUS = ["نشط", "موقوف"];

const TableFilter = ({
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
}) => {
  console.log("Current column filters:", columnFilters);

  return (
    <div className="table-filter d-flex align-items-center gap-2">
      <InputField
        type="text"
        placeholder="بحث"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id="popover-basic">
            <Popover.Header as="h3"> فرز بواسطه الحاله : </Popover.Header>
            <Popover.Body>
              <div className="status-container ">
                {STATUS.map((status, index) => (
                  <button
                    key={index}
                    className={`${
                      columnFilters.some(
                        (filter) =>
                          filter.id === "status" && filter.value === status
                      )
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setColumnFilters((prev) => {
                        console.log(prev);
                        // Find existing status filter
                        const existingFilter = prev.find(
                          (filter) => filter.id === "status"
                        );

                        // If no status filter exists, create a new one
                        if (!existingFilter) {
                          return [
                            ...prev,
                            {
                              id: "status",
                              value: status,
                            },
                          ];
                        }

                        // If status is already selected, remove the filter
                        if (existingFilter.value === status) {
                          return prev.filter(
                            (filter) => filter.id !== "status"
                          );
                        }

                        // Otherwise, update the status filter
                        return prev.map((filter) => {
                          if (filter.id === "status") {
                            return { ...filter, value: status };
                          }
                          return filter;
                        });
                      })
                    }
                  >
                    <div
                      className={`color-icon ${
                        status === "نشط" ? "active" : "inactive"
                      }`}
                    ></div>
                    {status}
                  </button>
                ))}
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <button className="button filter-button" id="dropdown-basic">
          <span>فرز</span>
          <i className="fa-regular fa-filter"></i>
        </button>
      </OverlayTrigger>
      
    </div>
  );
};

export default TableFilter;
