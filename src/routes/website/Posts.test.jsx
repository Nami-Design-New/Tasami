import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useGetPosts from "../../hooks/website/communities/posts/useGetPosts";
import Posts from "./Posts";

const setSearchParams = vi.fn();

vi.mock("react-router", () => ({
  useSearchParams: () => [new URLSearchParams(), setSearchParams],
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "rtl" },
  }),
}));

vi.mock("../../hooks/website/communities/posts/useGetPosts", () => ({
  default: vi.fn(),
}));

vi.mock("../../ui/loading/InfiniteScroll", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("../../ui/website/communities/posts/PostCard", () => ({
  default: ({ post }) => <div>{post.title}</div>,
}));

vi.mock("../../ui/website/communities/posts/AddPostModal", () => ({
  default: () => null,
}));

describe("Posts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGetPosts.mockReturnValue({
      posts: {
        pages: [{ data: [{ id: 1, title: "First post" }], total: 19 }],
      },
      isLoading: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
      isFetchingNextPage: false,
    });
  });

  it("shows the posts count and search field", () => {
    render(<Posts />);

    expect(screen.getByText("19")).toBeInTheDocument();
    expect(screen.getByText("community.postsCountLabel")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("community.searchPosts"),
    ).toBeInTheDocument();
  });

  it("updates the search query after the debounce delay", () => {
    vi.useFakeTimers();
    render(<Posts />);

    fireEvent.change(screen.getByPlaceholderText("community.searchPosts"), {
      target: { value: "planning" },
    });

    act(() => vi.advanceTimersByTime(500));

    expect(setSearchParams).toHaveBeenCalledOnce();
    const updateSearchParams = setSearchParams.mock.calls[0][0];
    expect(updateSearchParams(new URLSearchParams()).get("search")).toBe(
      "planning",
    );

    vi.useRealTimers();
  });
});
