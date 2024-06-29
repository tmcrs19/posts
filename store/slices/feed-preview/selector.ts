import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@faceit/store/store";

export const selectFeedState = (state: RootState) => state.feed;

export const selectFeedData = createSelector(selectFeedState, (feedState) => ({
  currentPage: feedState.currentPage,
  feedPosts: feedState.posts,
  hasMorePosts: feedState.hasMorePosts,
}));
