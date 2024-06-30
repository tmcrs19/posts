import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { feedApi } from "@faceit/store/api/feed-preview";
import { startAppListening } from "@faceit/store/listenerMiddleware";
import { IFeedPost, IUser } from "@faceit/lib/server/feed-preview";

interface FeedState {
  posts: IFeedPost[];
  users: IUser[];
  hasMorePosts: boolean;
  currentPage: number;
  newUserPostNotification: string | null;
}

interface SetPostsAndUsersPayload {
  posts: IFeedPost[];
  users: IUser[];
}

export const initialState: FeedState = {
  posts: [],
  users: [],
  hasMorePosts: true,
  currentPage: 1,
  newUserPostNotification: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPostsAndUsers(state, action: PayloadAction<SetPostsAndUsersPayload>) {
      const { posts, users } = action.payload;
      state.posts = posts;
      state.users = users;
    },
    setHasMorePosts(state, action: PayloadAction<boolean>) {
      state.hasMorePosts = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    addNewPost(state, action: PayloadAction<IFeedPost>) {
      const post = action.payload;
      const user = state.users.find((user) => user.id === post.userId);
      const username = user ? user.username : "Unknown User";
      state.posts = [post, ...state.posts];
      state.newUserPostNotification = username;
    },
    clearNewUserPostNotification(state) {
      state.newUserPostNotification = null;
    },
  },
});

export const {
  setPostsAndUsers,
  setHasMorePosts,
  setCurrentPage,
  addNewPost,
  clearNewUserPostNotification,
} = feedSlice.actions;
export default feedSlice.reducer;

startAppListening({
  matcher: feedApi.endpoints.getPosts.matchFulfilled,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const users = state.api.queries["getUsers(undefined)"]?.data as IUser[];

    listenerApi.dispatch(
      setPostsAndUsers({
        posts: [...state.feed.posts, ...action.payload],
        users,
      })
    );

    if (action.payload.length < 20) {
      listenerApi.dispatch(setHasMorePosts(false));
    }
  },
});
