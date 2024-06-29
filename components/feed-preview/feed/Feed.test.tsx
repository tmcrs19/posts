import React from "react";
import { screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { Feed } from "./Feed";
import { renderWithProviders } from "@faceit/lib/test-utils";
import { mockUsers, mockFeedPosts } from "@faceit/lib/server/feed-preview";

jest.mock("socket.io-client", () => {
  const mockSocket = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    connected: false,
  };
  return {
    io: jest.fn(() => mockSocket),
  };
});

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

describe("Feed Component", () => {
  test("renders Feed component with posts", async () => {
    renderWithProviders(<Feed />);

    const posts = await screen.findAllByRole("link");
    const firstPost = posts[0];
    const secondPost = posts[1];
    const thirdPost = posts[2];

    expect(firstPost).toHaveAttribute("href", "/user1/post/1");
    expect(secondPost).toHaveAttribute("href", "/user2/post/2");
    expect(thirdPost).toHaveAttribute("href", "/Unknown User/post/3");
  });
});
