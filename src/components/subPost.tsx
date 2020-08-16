import * as React from "react";
import {
  useGetPostQuery,
  useGetCommentsForPostQuery,
  CommentFragment,
} from "../types";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Date } from "./post";

export function SubPost(props: {}) {
  const { postId } = useParams();
  const [postResult] = useGetPostQuery({ variables: { id: postId } });
  const [commentsResult] = useGetCommentsForPostQuery({
    variables: { id: postId },
  });

  const post = postResult.data?.getPost;
  if (postResult.fetching) {
    return <div>Loading</div>;
  }
  if (post == null) {
    return <div>Error</div>;
  }
  return (
    <div>
      <div className="content">
        <h2 className="title is-2">{post.title}</h2>
        <div className="content">
          <ReactMarkdown source={post.content ?? ""} />
        </div>
      </div>
      <div className="content">
        <h3 className="title is-3">Comments ???</h3>
      </div>
      {commentsResult.fetching ? (
        <div className="loading">Comments Loading</div>
      ) : (
        commentsResult.data?.getPost.comments.edges.map((node) => (
          <Comment key={node.node.id}>{node.node}</Comment>
        ))
      )}
    </div>
  );
}

type CommentFragmentWithChildren = CommentFragment & {
  children?: { edges: Array<{ node: CommentFragmentWithChildren }> };
};

function Comment(props: { children: CommentFragmentWithChildren }) {
  const comment = props.children;
  return (
    <div className="content pl-4 pt-2">
      <div className="level">
        <div className="level-left">
          <Link to={`/u/${comment.author.name}`}>{comment.author.name}</Link>
        </div>
        <div className="level-left">
          <Date label="" seconds={comment.time} />
        </div>
      </div>
      <div>
        <ReactMarkdown source={comment.content ?? "\\[DELETED\\]"} />
      </div>
      <div className="level">
        <div className="level-left">{comment.upVotes - comment.downVotes}</div>
        <div className="level-left">
          (+{comment.upVotes} | -{comment.downVotes})
        </div>
      </div>
      {comment.children?.edges.map((node) => (
        <Comment key={node.node.id}>{node.node}</Comment>
      ))}
    </div>
  );
}
