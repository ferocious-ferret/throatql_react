import * as React from "react";
import { Link } from "react-router-dom";
import { PostSummaryFragment } from "../types";
import moment from "moment";

type PostNode = PostSummaryFragment["edges"][0]["node"];

function TitleLink(props: {
  postLink: string;
  link: string | null | undefined;
  title: string | null | undefined;
}) {
  if (props.link != null) {
    return (
      <a className="title is-4" href={props.link}>
        {props.title}
      </a>
    );
  } else {
    return (
      <Link className="title is-4" to={props.postLink}>
        {props.title}
      </Link>
    );
  }
}

export function Date(props: { label: string; seconds: number }) {
  const t = moment(props.seconds * 1000);

  return (
    <div className="field is-grouped is-grouped-multiline">
      <div className="control">
        <div className="">
          <span className="">{props.label} </span>
          <span className="">{t.fromNow()}</span>
        </div>
      </div>
    </div>
  );
}

export function Post(props: { children: PostNode; noSub?: boolean }) {
  const post = props.children;

  return (
    <div className="media">
      <div className="media-right">
        <div className="level">
          <div className="level-item"></div>
        </div>
      </div>
      <div className="media-content">
        <div className="content">
          <div>
            <TitleLink
              postLink={`/o/${post.sub.name}/${post.id}`}
              link={post.link}
              title={post.title}
            />
            <div className="level-left">
              <span className="level-item">
                By:{" "}
                <Link to={`/u/${post.author.name}`}>{post.author.name}</Link>
              </span>
              {props.noSub ? (
                <></>
              ) : (
                <span className="level-item">
                  Posted In:{" "}
                  <Link to={`/o/${post.sub.name}`}>{post.sub.name}</Link>
                </span>
              )}
              <span className="level-item">
                <Date label="Posted" seconds={post.posted ?? 0} />
              </span>
              <br />
            </div>
            <div className="level">
              <div className="level-left">
                <span className="level-item">
                  <Link to={`/o/${post.sub.name}/${post.id}`}>
                    Comments: {post.commentCount}
                  </Link>
                </span>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <div>⬆</div>
                  <div>{post.score}</div>
                  <div>⬇</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
