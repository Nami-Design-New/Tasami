import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test/utils";
import NotificationTable from "../dash-board/notifications/NotificationTable";

// Mock fetch
global.fetch = vi.fn();

describe("NotificationTable - Integration Tests", () => {
  const mockApiResponse = {
    data: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "Active",
        role: "Admin",
        created_at: "2024-01-01",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Inactive",
        role: "User",
        created_at: "2024-01-02",
      },
    ],
    current_page: 1,
    last_page: 5,
    per_page: 10,
    total: 50,
  };

  beforeEach(() => {
    fetch.mockClear();
  });

  describe("Initial Load", () => {
    it("should fetch and display data on mount", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/users?page=1&per_page=10"),
      );
    });

    it("should show loading state while fetching", () => {
      fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

      renderWithProviders(<NotificationTable />);

      // Should show loading placeholders
      const placeholders = document.querySelectorAll(".placeholder");
      expect(placeholders.length).toBeGreaterThan(0);
    });

    it("should handle API errors gracefully", async () => {
      fetch.mockRejectedValueOnce(new Error("Network error"));

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
      });
    });
  });

  describe("Search Functionality", () => {
    it("should debounce search and fetch filtered results", async () => {
      const user = userEvent.setup();
      vi.useFakeTimers();

      // Initial load
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Search
      const searchInput = screen.getByPlaceholderText("Search users...");

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockApiResponse,
          data: [mockApiResponse.data[0]],
        }),
      });

      await user.type(searchInput, "John");

      // Should not call API immediately
      expect(fetch).toHaveBeenCalledTimes(1);

      // Advance timers to trigger debounce
      vi.advanceTimersByTime(500);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenLastCalledWith(
          expect.stringContaining("search=John"),
        );
      });

      vi.useRealTimers();
    });

    it("should reset to page 1 when searching", async () => {
      const user = userEvent.setup();
      vi.useFakeTimers();

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Search users...");
      await user.type(searchInput, "test");

      vi.advanceTimersByTime(500);

      await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
          expect.stringContaining("page=1"),
        );
      });

      vi.useRealTimers();
    });
  });

  describe("Pagination", () => {
    it("should fetch data for different pages", async () => {
      const user = userEvent.setup();

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      const nextButton = screen.getByText("Next");
      await user.click(nextButton);

      await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
          expect.stringContaining("page=2"),
        );
      });
    });

    it("should disable next button on last page", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockApiResponse,
          current_page: 5,
          last_page: 5,
        }),
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        const nextButton = screen.getByText("Next");
        expect(nextButton).toBeDisabled();
      });
    });
  });

  describe("Server-Side Sorting", () => {
    it("should sort by column in ascending order", async () => {
      const user = userEvent.setup();

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Click on Name column header to sort
      const nameHeader = screen.getByText("Name").closest("th");
      const sortButton = nameHeader.querySelector("button");

      await user.click(sortButton);

      await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
          expect.stringContaining("sort_by=name&sort_order=asc"),
        );
      });
    });

    it("should toggle sort order on repeated clicks", async () => {
      const user = userEvent.setup();

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      const nameHeader = screen.getByText("Name").closest("th");
      const sortButton = nameHeader.querySelector("button");

      // First click - ascending
      await user.click(sortButton);
      await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
          expect.stringContaining("sort_order=asc"),
        );
      });

      // Second click - descending
      await user.click(sortButton);
      await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
          expect.stringContaining("sort_order=desc"),
        );
      });

      // Third click - clear sort
      await user.click(sortButton);
      await waitFor(() => {
        const lastCall = fetch.mock.calls[fetch.mock.calls.length - 1][0];
        expect(lastCall).not.toContain("sort_by");
      });
    });
  });

  describe("Filtering", () => {
    it("should apply status filter", async () => {
      const user = userEvent.setup();

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Open status filter
      const statusFilterButton = screen.getByText(/Status/i).closest("button");
      await user.click(statusFilterButton);

      // Select Active status
      const activeOption = screen.getByText("Active");
      await user.click(activeOption);

      await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
          expect.stringContaining("status=Active"),
        );
      });
    });

    it("should apply multiple filters", async () => {
      const user = userEvent.setup();

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Apply status filter
      const statusFilterButton = screen.getByText(/Status/i).closest("button");
      await user.click(statusFilterButton);
      await user.click(screen.getByText("Active"));

      // Apply role filter
      const roleFilterButton = screen.getByText(/Role/i).closest("button");
      await user.click(roleFilterButton);
      await user.click(screen.getByText("Admin"));

      await waitFor(() => {
        const lastCall = fetch.mock.calls[fetch.mock.calls.length - 1][0];
        expect(lastCall).toContain("status=Active");
        expect(lastCall).toContain("role=Admin");
      });
    });
  });

  describe("Combined Operations", () => {
    it("should handle search, sort, and filter together", async () => {
      const user = userEvent.setup();
      vi.useFakeTimers();

      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      renderWithProviders(<NotificationTable />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Search
      const searchInput = screen.getByPlaceholderText("Search users...");
      await user.type(searchInput, "John");
      vi.advanceTimersByTime(500);

      // Sort
      const nameHeader = screen.getByText("Name").closest("th");
      const sortButton = nameHeader.querySelector("button");
      await user.click(sortButton);

      // Filter
      const statusFilterButton = screen.getByText(/Status/i).closest("button");
      await user.click(statusFilterButton);
      await user.click(screen.getByText("Active"));

      await waitFor(() => {
        const lastCall = fetch.mock.calls[fetch.mock.calls.length - 1][0];
        expect(lastCall).toContain("search=John");
        expect(lastCall).toContain("sort_by=name");
        expect(lastCall).toContain("status=Active");
      });

      vi.useRealTimers();
    });
  });
});
