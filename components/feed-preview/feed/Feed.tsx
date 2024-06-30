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
  addNewPost,
  selectFeedData,
  selectMappedPosts,
} from "@faceit/store/slices/feed-preview";
import socket from "@faceit/lib/socket";
import { Spinner } from "@faceit/components/ui/Spinner";
import { FeedSkeleton } from "./FeedSkeleton";
import { FeedPost } from "./FeedPost";
import { IFeedPost } from "@faceit/lib/server/feed-preview";

export const Feed: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const dispatch = useAppDispatch();

  const { currentPage, hasMorePosts } = useAppSelector(selectFeedData);
  const feedPosts = useAppSelector(selectMappedPosts);

  const [highlightedPostId, setHighlightedPostId] = useState<number | null>(
    null
  );

  const { data: users, isSuccess: usersSuccess } = useGetUsersQuery();
  const { error, isLoading, isFetching } = useGetPostsQuery(currentPage, {
    skip: !users,
  });

  const handleNewPost = useCallback(
    (newPost: IFeedPost) => {
      dispatch(addNewPost(newPost));
      setHighlightedPostId(newPost.id);
      setTimeout(() => {
        setHighlightedPostId(null);
      }, 10000);
    },
    [dispatch]
  );

  useEffect(() => {
    if (usersSuccess) {
      const onConnect = () => {
        setIsConnected(true);
      };

      const onDisconnect = () => {
        setIsConnected(false);
      };

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      socket.on("newPost", handleNewPost);

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("newPost", handleNewPost);
        socket.disconnect();
      };
    }
  }, [handleNewPost, usersSuccess]);

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
