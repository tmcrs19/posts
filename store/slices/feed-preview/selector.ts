import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@faceit/store/store";

export const selectFeedState = (state: RootState) => state.feed;
const selectUsers = (state: RootState) => state.feed.users;

export const selectMappedPosts = createSelector(
  [selectFeedState, selectUsers],
  (feedState, users) => {
    return feedState.posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      return {
        ...post,
        username: user ? user.username : "Unknown User",
      };
    });
  }
);

export const selectFeedData = createSelector(selectFeedState, (feedState) => ({
  currentPage: feedState.currentPage,
  hasMorePosts: feedState.hasMorePosts,
  newUserPostNotification: feedState.newUserPostNotification,
}));
