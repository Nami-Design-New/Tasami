import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TablePagination from "./TablePagentaion";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        "dashboard.table.previous": "Previous",
        "dashboard.table.next": "Next",
        "dashboard.table.page": "Page",
        "dashboard.table.of": "of",
      };
      return translations[key] || key;
    },
  }),
}));

describe("TablePagination", () => {
  let mockOnPageChange;

  beforeEach(() => {
    mockOnPageChange = vi.fn();
  });

  describe("Rendering", () => {
    it("should render pagination buttons and info", () => {
      render(
        <TablePagination
          currentPage={1}
          lastPage={5}
          onPageChange={mockOnPageChange}
        />,
      );

      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      //   expect(screen.getByText("Page")).toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
      expect(screen.getByText(/of/)).toBeInTheDocument();
      expect(screen.getByText(/5/)).toBeInTheDocument();
    });

    it("should render correct page numbers for small page count", () => {
      render(
        <TablePagination
          currentPage={2}
          lastPage={4}
          onPageChange={mockOnPageChange}
        />,
      );

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
    });

    it("should render ellipsis for large page count", () => {
      render(
        <TablePagination
          currentPage={5}
          lastPage={10}
          onPageChange={mockOnPageChange}
        />,
      );

      const ellipsis = screen.getAllByText("...");
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it("should highlight current page", () => {
      render(
        <TablePagination
          currentPage={3}
          lastPage={5}
          onPageChange={mockOnPageChange}
        />,
      );

      const currentPageButton = screen.getByRole("button", { name: "3" });
      expect(currentPageButton).toHaveClass("active");
    });
  });

  describe("Navigation", () => {
    it("should call onPageChange when clicking next button", async () => {
      const user = userEvent.setup();

      render(
        <TablePagination
          currentPage={2}
          lastPage={5}
          onPageChange={mockOnPageChange}
        />,
      );

      await user.click(screen.getByText("Next"));
      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it("should call onPageChange when clicking previous button", async () => {
      const user = userEvent.setup();

      render(
        <TablePagination
          currentPage={3}
          lastPage={5}
          onPageChange={mockOnPageChange}
        />,
      );

      await user.click(screen.getByText("Previous"));
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("should call onPageChange when clicking page number", async () => {
      const user = userEvent.setup();

      render(
        <TablePagination
          currentPage={1}
          lastPage={5}
          onPageChange={mockOnPageChange}
        />,
      );

      await user.click(screen.getByRole("button", { name: "4" }));
      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });
  });

  describe("Disabled states", () => {
    it("should disable previous button on first page", () => {
      render(
        <TablePagination
          currentPage={1}
          lastPage={5}
          onPageChange={mockOnPageChange}
        />,
      );

      const prevButton = screen.getByText("Previous");
      expect(prevButton).toBeDisabled();
    });

    it("should disable next button on last page", () => {
      render(
        <TablePagination
          currentPage={5}
          lastPage={5}
          onPageChange={mockOnPageChange}
        />,
      );

      const nextButton = screen.getByText("Next");
      expect(nextButton).toBeDisabled();
    });

    it("should disable all buttons when loading", () => {
      render(
        <TablePagination
          currentPage={2}
          lastPage={5}
          onPageChange={mockOnPageChange}
          isLoading={true}
        />,
      );

      expect(screen.getByText("Previous")).toBeDisabled();
      expect(screen.getByText("Next")).toBeDisabled();

      const pageButtons = screen
        .getAllByRole("button")
        .filter((btn) => !isNaN(parseInt(btn.textContent)));
      pageButtons.forEach((btn) => expect(btn).toBeDisabled());
    });

    it("should not trigger onPageChange when disabled", async () => {
      const user = userEvent.setup();

      render(
        <TablePagination
          currentPage={1}
          lastPage={5}
          onPageChange={mockOnPageChange}
        />,
      );

      await user.click(screen.getByText("Previous"));
      expect(mockOnPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    it("should handle single page", () => {
      render(
        <TablePagination
          currentPage={1}
          lastPage={1}
          onPageChange={mockOnPageChange}
        />,
      );

      expect(screen.getByText("Previous")).toBeDisabled();
      expect(screen.getByText("Next")).toBeDisabled();
    });

    it("should handle page at beginning with ellipsis", () => {
      render(
        <TablePagination
          currentPage={2}
          lastPage={10}
          onPageChange={mockOnPageChange}
        />,
      );

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("should handle page at end with ellipsis", () => {
      render(
        <TablePagination
          currentPage={9}
          lastPage={10}
          onPageChange={mockOnPageChange}
        />,
      );

      expect(screen.getByText("8")).toBeInTheDocument();
      expect(screen.getByText("9")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
    });
  });
});
