"use client";
import React, { useCallback, useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@faceit/store/hooks";
import {
  useGetPostsQuery,
  useGetUsersQuery,
} from "@faceit/store/api/feed-preview";
import Link from "next/link";
import {
  setCurrentPage,
  setPostsAndUsers,
  selectFeedData,
} from "@faceit/store/slices/feed-preview";
import socket from "@faceit/lib/socket";
import { Spinner } from "@faceit/components/ui/Spinner";
import { FeedSkeleton } from "./FeedSkeleton";
import { FeedPost } from "./FeedPost";

export const Feed: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const dispatch = useAppDispatch();

  const { currentPage, feedPosts, hasMorePosts } =
    useAppSelector(selectFeedData);

  const [highlightedPostId, setHighlightedPostId] = useState<number | null>(
    null
  );

  const { data: users, isSuccess: usersSuccess } = useGetUsersQuery();
  const {
    error,
    isLoading,
    isFetching,
    isSuccess: postsSuccess,
  } = useGetPostsQuery(currentPage, {
    skip: !users,
  });

  // https://github.com/mahmodghnaj/wrapping-socket-with-nextJs
  // Potential reusable hook for handling socket connections
  useEffect(() => {
    if (usersSuccess && postsSuccess) {
      const onConnect = () => {
        setIsConnected(true);
      };

      const onDisconnect = () => {
        setIsConnected(false);
      };

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      socket.on("newPost", (newPost) => {
        dispatch(setPostsAndUsers({ posts: [newPost, ...feedPosts], users }));
        setHighlightedPostId(newPost.id);
        setTimeout(() => {
          setHighlightedPostId(null);
        }, 3000);
      });

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("newPost");
        socket.disconnect();
      };
    }
  }, [dispatch, feedPosts, users, usersSuccess, postsSuccess]);

  // NOTE: this logic to maintain the scroll position shouldn't be necessary
  // <Link scroll={false} /> should be enough to prevent the scroll position from resetting
  // Perhaps this is a bug in Next.js or I'm missing something
  const handlePostClick = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
  };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  const observer = useRef<IntersectionObserver>();
  const lastPostElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading || isFetching || !hasMorePosts) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(setCurrentPage(currentPage + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, hasMorePosts, currentPage, dispatch]
  );

  if (isLoading || !users) return <FeedSkeleton />;
  if (error) return <p>Error loading posts</p>;

  return (
    <ul>
      {feedPosts.map((post, index) => (
        <li
          key={post.id}
          ref={feedPosts.length === index + 1 ? lastPostElementRef : null}
        >
          <Link
            scroll={false}
            onClick={handlePostClick}
            href={`/${post.username}/post/${post.id}`}
          >
            <FeedPost
              username={post.username}
              body={post.body}
              isHighlighted={highlightedPostId === post.id}
            />
          </Link>
        </li>
      ))}
      {isFetching && (
        <div className="flex justify-center items-center mt-4">
          <Spinner />
        </div>
      )}
    </ul>
  );
};
