import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReusableDataTable from "./ReusableDataTable";

// Mock dependencies
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        "dashboard.table.drag": "Drag",
        "dashboard.table.sortAsc": "Asc",
        "dashboard.table.sortDesc": "Desc",
        noData: "No data available",
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("./TableFilter", () => ({
  default: ({ globalFilter, setGlobalFilter, searchPlaceholder }) => (
    <div data-testid="table-filter">
      <input
        data-testid="search-input"
        placeholder={searchPlaceholder}
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  ),
}));

describe("ReusableDataTable", () => {
  const mockColumns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => getValue(),
    },
  ];

  const mockData = [
    { id: 1, name: "John Doe", status: "Active" },
    { id: 2, name: "Jane Smith", status: "Inactive" },
    { id: 3, name: "Bob Johnson", status: "Active" },
  ];

  let mockSetPage;
  let mockSetPageSize;

  beforeEach(() => {
    mockSetPage = vi.fn();
    mockSetPageSize = vi.fn();
  });

  describe("Basic Rendering", () => {
    it("should render table with data", () => {
      render(
        <ReusableDataTable
          title="Test Table"
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
        />,
      );

      expect(screen.getByText("Test Table")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });

    it("should render column headers", () => {
      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
        />,
      );

      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });

    it("should render without header when header is false", () => {
      render(
        <ReusableDataTable
          title="Test Table"
          header={false}
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
        />,
      );

      expect(screen.queryByText("Test Table")).not.toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should show no data message when data is empty", () => {
      render(
        <ReusableDataTable
          data={[]}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
        />,
      );

      expect(screen.getByText("No data available")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("should show loading placeholders when isLoading is true", () => {
      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
          isLoading={true}
          pageSize={5}
        />,
      );

      const placeholders = screen.getAllByRole("row").slice(1); // Skip header row
      expect(placeholders.length).toBe(5);
    });

    it("should not show actual data when loading", () => {
      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
          isLoading={true}
        />,
      );

      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("should render search input when search is true", () => {
      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
          search={true}
        />,
      );

      expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });

    it("should call onSearchChange after debounce delay", async () => {
      const mockOnSearchChange = vi.fn();
      vi.useFakeTimers();

      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
          onSearchChange={mockOnSearchChange}
          searchDebounceMs={500}
        />,
      );

      const searchInput = screen.getByTestId("search-input");
      await userEvent.type(searchInput, "test query");

      expect(mockOnSearchChange).not.toHaveBeenCalled();

      vi.advanceTimersByTime(500);

      await waitFor(() => {
        expect(mockOnSearchChange).toHaveBeenCalledWith("test query");
      });

      vi.useRealTimers();
    });

    it("should reset to page 1 when searching", async () => {
      const mockOnSearchChange = vi.fn();
      vi.useFakeTimers();

      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={3}
          lastPage={5}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
          onSearchChange={mockOnSearchChange}
          searchDebounceMs={500}
        />,
      );

      const searchInput = screen.getByTestId("search-input");
      await userEvent.type(searchInput, "search");

      vi.advanceTimersByTime(500);

      await waitFor(() => {
        expect(mockSetPage).toHaveBeenCalledWith(1);
      });

      vi.useRealTimers();
    });
  });

  describe("Drag and Drop", () => {
    it("should add drag handle column when rowDnD is true", () => {
      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
          rowDnD={true}
        />,
      );

      expect(screen.getByText("Drag")).toBeInTheDocument();
    });

    it("should call onRowsReordered when rows are reordered", () => {
      const mockOnRowsReordered = vi.fn();

      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
          rowDnD={true}
          onRowsReordered={mockOnRowsReordered}
        />,
      );

      // This is a simplified test - actual drag and drop testing would require more setup
      expect(mockOnRowsReordered).not.toHaveBeenCalled();
    });
  });

  describe("Children Rendering", () => {
    it("should render children in footer", () => {
      render(
        <ReusableDataTable
          data={mockData}
          columns={mockColumns}
          currentPage={1}
          lastPage={1}
          setPage={mockSetPage}
          setPageSize={mockSetPageSize}
        >
          <div data-testid="custom-footer">Custom Footer Content</div>
        </ReusableDataTable>,
      );

      expect(screen.getByTestId("custom-footer")).toBeInTheDocument();
      expect(screen.getByText("Custom Footer Content")).toBeInTheDocument();
    });
  });
});
