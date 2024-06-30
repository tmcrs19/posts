import React from "react";
import type { Metadata } from "next";
import { getPost } from "@faceit/lib/server/feed-preview";
import { FeedPostAppBar } from "@faceit/app/(feed-preview)/app-bar";

interface PostPageProps {
  params: {
    username: string;
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.id);

  return {
    title: post ? `${params.username}: ${post.body}` : "Post not found",
  };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const { username, id } = params;
  const post = await getPost(id);

  if (!post) {
    return <p className="text-center">No such post exists</p>;
  }

  return (
    <>
      <FeedPostAppBar />
      <article className="container border-b border-gray-200">
        <div className="flex items-center mt-4 p-4">
          <div
            aria-label={`Avatar of ${username}`}
            role="img"
            className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-2xl text-white"
            style={{ width: "50px", height: "50px" }}
          >
            {username[0].toUpperCase()}
          </div>
          <p className="ml-4 text-xl font-bold">{username}</p>{" "}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2">{post.body}</p>
        </div>
      </article>
    </>
  );
};

export default PostPage;
