"use client";
import { useAppSelector, useAppDispatch } from "@faceit/store/hooks";
import {
  clearNewUserPostNotification,
  selectFeedData,
} from "@faceit/store/slices/feed-preview";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

const NotificationBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { newUserPostNotification } = useAppSelector(selectFeedData);

  if (!newUserPostNotification) return null;

  const handleClick = () => {
    dispatch(clearNewUserPostNotification());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <FaArrowUp className="mr-2" />
      <div
        aria-label={`Avatar of ${newUserPostNotification}`}
        role="img"
        className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-sm text-white"
        style={{ minWidth: "25px", minHeight: "25px" }}
      >
        {newUserPostNotification[0].toUpperCase()}
      </div>
      <span className="ml-2">posted</span>
    </div>
  );
};

export default NotificationBar;
