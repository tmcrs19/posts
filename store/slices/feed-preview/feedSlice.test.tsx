import { waitFor } from "@testing-library/react";
import { renderWithProviders } from "@faceit/lib/test-utils";
import { mockUsers, mockFeedPosts } from "@faceit/lib/server/feed-preview";
import { feedApi } from "@faceit/store/api/feed-preview";

import feedReducer, { setCurrentPage, initialState } from "./slice";

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(async (req) => {
    const endpoint = req.url.split("/").pop();
    switch (endpoint) {
      case "users":
        return JSON.stringify(mockUsers);
      case "posts?_page=1&_limit=20":
        return JSON.stringify(mockFeedPosts);
      default:
        return JSON.stringify({});
    }
  });
});

describe("feed slice", () => {
  it("should handle initial state", () => {
    expect(feedReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setCurrentPage", () => {
    const actual = feedReducer(initialState, setCurrentPage(2));
    expect(actual.currentPage).toEqual(2);
  });

  it("should trigger and handle getPosts listener action", async () => {
    const { store } = renderWithProviders(<div>test</div>);

    store.dispatch(feedApi.endpoints.getUsers.initiate());
    store.dispatch(feedApi.endpoints.getPosts.initiate(1));

    await waitFor(() => {
      const state = store.getState().feed;
      expect(state.currentPage).toEqual(1);
      expect(state.hasMorePosts).toEqual(false);
      expect(state.posts).toEqual([
        {
          body: "This is the body of post 1.",
          id: 1,
          title: "Post 1",
          userId: 1,
        },
        {
          body: "This is the body of post 2.",
          id: 2,
          title: "Post 2",
          userId: 2,
        },
        {
          body: "This is the body of post 3 with unknown user.",
          id: 3,
          title: "Post 3",
          userId: 5,
        },
      ]);
    });
  });
});
