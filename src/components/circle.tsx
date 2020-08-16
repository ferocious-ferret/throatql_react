import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { Post } from "./post";
import { useGetSubQuery, useGetSubSidebarQuery } from "../types";
import ReactMarkdown from "react-markdown";
import moment from "moment";

export function Circle() {
  const { circle }: { circle: string } = useParams();
  const [posts] = useGetSubQuery({
    variables: { name: circle, count: null, after: null },
  });
  if (posts.fetching) {
    return <div>Fetching Posts</div>;
  }
  return (
    <div className="content">
      {posts.data?.getSub.posts.edges.map((node) => {
        const post = node.node;
        return (
          <Post noSub key={post.id}>
            {post}
          </Post>
        );
      })}
    </div>
  );
}

export function CircleHeader() {
  const { circle }: { circle: string } = useParams();
  const [sidebar] = useGetSubSidebarQuery({ variables: { name: circle } });

  return (
    <>
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link to={`/o/${circle}`}>{circle}</Link>
        </div>
      </div>
      <div className="navbar-start">
        <div className="navbar-item">
          Est Since:{" "}
          {moment(sidebar.data?.getSub.creation * 1000).format("MM/YYYY")}
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {sidebar.data?.getSub.subscribers} Subscribers
        </div>
      </div>
    </>
  );
}

export function CircleSidebar() {
  const { circle }: { circle: string } = useParams();
  const [sidebar] = useGetSubSidebarQuery({ variables: { name: circle } });

  return (
    <div>
      <div className="content">
        <ReactMarkdown source={sidebar.data?.getSub.sidebar} />
      </div>
      <div className="content">
        <h3 className="title is-3">Moderators</h3>
        <ul>
          {sidebar.data?.getSub.mods.map((mod) => (
            <li>
              <Link to={`/u/${mod.name}`}>{mod.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
