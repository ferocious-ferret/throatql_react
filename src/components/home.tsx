import * as React from "react";
import { Post } from "./post";
import { useGetHomePostsQuery } from "../types";

export function Home() {
  const [posts] = useGetHomePostsQuery();

  if (posts.fetching) {
    return <div>Fetching Posts</div>;
  }
  return (
    <div className="content">
      {posts.data?.getHomePosts.edges.map((node) => {
        const post = node.node;
        return <Post key={post.id}>{post}</Post>;
      })}
    </div>
  );
}

