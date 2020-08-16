import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** NaiveDateTime */
  NaiveDateTime: any;
};

export type SubsNode = {
  __typename?: 'SubsNode';
  node: Sub;
  cursor: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  upVotes: Scalars['Int'];
  downVotes: Scalars['Int'];
  score: Scalars['Int'];
  deleted: DeleteStatus;
  link?: Maybe<Scalars['String']>;
  nsfw: Scalars['Boolean'];
  posted?: Maybe<Scalars['NaiveDateTime']>;
  edited?: Maybe<Scalars['NaiveDateTime']>;
  postType: PostType;
  thumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  flair?: Maybe<Scalars['String']>;
  sub: Sub;
  author: User;
  comments: CommentPage;
  commentCount: Scalars['Int'];
};


export type PostCommentsArgs = {
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type CommentPage = {
  __typename?: 'CommentPage';
  edges: Array<CommentNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubsPage = {
  __typename?: 'SubsPage';
  edges: Array<SubsNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  apiVersion: Scalars['String'];
  getSubs: SubsPage;
  getSub: Sub;
  getPost: Post;
  getHomePosts: PostPage;
  getUser: User;
  getComment: Comment;
};


export type QueryGetSubsArgs = {
  count?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryGetSubArgs = {
  name: Scalars['String'];
};


export type QueryGetPostArgs = {
  id: Scalars['ID'];
};


export type QueryGetHomePostsArgs = {
  count?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  name: Scalars['String'];
};


export type QueryGetCommentArgs = {
  id: Scalars['ID'];
};


export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  deleted: DeleteStatus;
  lastEdit?: Maybe<Scalars['NaiveDateTime']>;
  parent: Comment;
  children: CommentPage;
  post: Post;
  score?: Maybe<Scalars['Int']>;
  upVotes: Scalars['Int'];
  downVotes: Scalars['Int'];
  time?: Maybe<Scalars['NaiveDateTime']>;
  author: User;
};


export type CommentChildrenArgs = {
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type Sub = {
  __typename?: 'Sub';
  subscribers: Scalars['Int'];
  posts: PostPage;
  name?: Maybe<Scalars['String']>;
  nsfw: Scalars['Boolean'];
  sidebar: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  mods: Array<User>;
  creation: Scalars['NaiveDateTime'];
};


export type SubPostsArgs = {
  count?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export enum PostType {
  Text = 'TEXT',
  Link = 'LINK',
  Poll = 'POLL'
}

export type PostNode = {
  __typename?: 'PostNode';
  node: Post;
  cursor: Scalars['String'];
};

export type PostPage = {
  __typename?: 'PostPage';
  edges: Array<PostNode>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommentNode = {
  __typename?: 'CommentNode';
  node: Comment;
  cursor: Scalars['String'];
};

export enum DeleteStatus {
  Not = 'NOT',
  User = 'USER',
  Mod = 'MOD',
  Admin = 'ADMIN'
}

export type User = {
  __typename?: 'User';
  uid: Scalars['String'];
  crypto: Crypto;
  joindate?: Maybe<Scalars['NaiveDateTime']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  score: Scalars['Int'];
  given: Scalars['Int'];
  status: UserStatus;
  resets: Scalars['Int'];
  posts: PostPage;
};


export type UserPostsArgs = {
  count?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export enum UserStatus {
  Ok = 'OK',
  Deleted = 'DELETED',
  SiteBan = 'SITE_BAN'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  endCursor: Scalars['String'];
};

export enum Crypto {
  Bcrypt = 'BCRYPT',
  KeyCloak = 'KEY_CLOAK'
}

export type PostSummaryFragment = (
  { __typename?: 'PostPage' }
  & { edges: Array<(
    { __typename?: 'PostNode' }
    & { node: (
      { __typename?: 'Post' }
      & Pick<Post, 'title' | 'id' | 'posted' | 'thumbnail' | 'link' | 'score' | 'commentCount'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'name'>
      ), sub: (
        { __typename?: 'Sub' }
        & Pick<Sub, 'name'>
      ) }
    ) }
  )>, pageInfo: (
    { __typename?: 'PageInfo' }
    & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
  ) }
);

export type GetHomePostsQueryVariables = Exact<{
  count?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetHomePostsQuery = (
  { __typename?: 'Query' }
  & { getHomePosts: (
    { __typename?: 'PostPage' }
    & PostSummaryFragment
  ) }
);

export type GetPostContentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostContentQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'content'>
  ) }
);

export type CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'content' | 'lastEdit' | 'upVotes' | 'downVotes' | 'time'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'name'>
  ) }
);

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'content' | 'upVotes' | 'downVotes' | 'link' | 'posted' | 'edited' | 'thumbnail' | 'title' | 'flair'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  ) }
);

export type GetCommentsForPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCommentsForPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & { comments: (
      { __typename?: 'CommentPage' }
      & { edges: Array<(
        { __typename?: 'CommentNode' }
        & { node: (
          { __typename?: 'Comment' }
          & { children: (
            { __typename?: 'CommentPage' }
            & { edges: Array<(
              { __typename?: 'CommentNode' }
              & { node: (
                { __typename?: 'Comment' }
                & { children: (
                  { __typename?: 'CommentPage' }
                  & { edges: Array<(
                    { __typename?: 'CommentNode' }
                    & { node: (
                      { __typename?: 'Comment' }
                      & { children: (
                        { __typename?: 'CommentPage' }
                        & { edges: Array<(
                          { __typename?: 'CommentNode' }
                          & { node: (
                            { __typename?: 'Comment' }
                            & CommentFragment
                          ) }
                        )> }
                      ) }
                      & CommentFragment
                    ) }
                  )> }
                ) }
                & CommentFragment
              ) }
            )> }
          ) }
          & CommentFragment
        ) }
      )> }
    ) }
  ) }
);

export type GetSubsQueryVariables = Exact<{
  count?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetSubsQuery = (
  { __typename?: 'Query' }
  & { getSubs: (
    { __typename?: 'SubsPage' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ), edges: Array<(
      { __typename?: 'SubsNode' }
      & { node: (
        { __typename?: 'Sub' }
        & Pick<Sub, 'title' | 'name' | 'creation'>
      ) }
    )> }
  ) }
);

export type GetSubQueryVariables = Exact<{
  name: Scalars['String'];
  count?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetSubQuery = (
  { __typename?: 'Query' }
  & { getSub: (
    { __typename?: 'Sub' }
    & { posts: (
      { __typename?: 'PostPage' }
      & PostSummaryFragment
    ) }
  ) }
);

export type GetSubSidebarQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetSubSidebarQuery = (
  { __typename?: 'Query' }
  & { getSub: (
    { __typename?: 'Sub' }
    & Pick<Sub, 'sidebar' | 'creation' | 'subscribers'>
    & { mods: Array<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )> }
  ) }
);

export const PostSummaryFragmentDoc = gql`
    fragment PostSummary on PostPage {
  edges {
    node {
      title
      id
      posted
      thumbnail
      link
      score
      commentCount
      author {
        name
      }
      sub {
        name
      }
    }
  }
  pageInfo {
    hasNextPage
    endCursor
  }
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  content
  lastEdit
  author {
    name
  }
  upVotes
  downVotes
  time
}
    `;
export const GetHomePostsDocument = gql`
    query getHomePosts($count: Int, $after: String) {
  getHomePosts(count: $count, after: $after) {
    ...PostSummary
  }
}
    ${PostSummaryFragmentDoc}`;

export function useGetHomePostsQuery(options: Omit<Urql.UseQueryArgs<GetHomePostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetHomePostsQuery>({ query: GetHomePostsDocument, ...options });
};
export const GetPostContentDocument = gql`
    query getPostContent($id: ID!) {
  getPost(id: $id) {
    content
  }
}
    `;

export function useGetPostContentQuery(options: Omit<Urql.UseQueryArgs<GetPostContentQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostContentQuery>({ query: GetPostContentDocument, ...options });
};
export const GetPostDocument = gql`
    query getPost($id: ID!) {
  getPost(id: $id) {
    content
    upVotes
    downVotes
    link
    posted
    edited
    thumbnail
    title
    flair
    author {
      name
    }
  }
}
    `;

export function useGetPostQuery(options: Omit<Urql.UseQueryArgs<GetPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostQuery>({ query: GetPostDocument, ...options });
};
export const GetCommentsForPostDocument = gql`
    query getCommentsForPost($id: ID!) {
  getPost(id: $id) {
    comments {
      edges {
        node {
          ...Comment
          children(limit: 10) {
            edges {
              node {
                ...Comment
                children(limit: 5) {
                  edges {
                    node {
                      ...Comment
                      children(limit: 2) {
                        edges {
                          node {
                            ...Comment
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    ${CommentFragmentDoc}`;

export function useGetCommentsForPostQuery(options: Omit<Urql.UseQueryArgs<GetCommentsForPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommentsForPostQuery>({ query: GetCommentsForPostDocument, ...options });
};
export const GetSubsDocument = gql`
    query getSubs($count: Int, $after: String) {
  getSubs(count: $count, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        title
        name
        creation
      }
    }
  }
}
    `;

export function useGetSubsQuery(options: Omit<Urql.UseQueryArgs<GetSubsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSubsQuery>({ query: GetSubsDocument, ...options });
};
export const GetSubDocument = gql`
    query getSub($name: String!, $count: Int, $after: String) {
  getSub(name: $name) {
    posts(count: $count, after: $after) {
      ...PostSummary
    }
  }
}
    ${PostSummaryFragmentDoc}`;

export function useGetSubQuery(options: Omit<Urql.UseQueryArgs<GetSubQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSubQuery>({ query: GetSubDocument, ...options });
};
export const GetSubSidebarDocument = gql`
    query getSubSidebar($name: String!) {
  getSub(name: $name) {
    mods {
      name
    }
    sidebar
    creation
    subscribers
  }
}
    `;

export function useGetSubSidebarQuery(options: Omit<Urql.UseQueryArgs<GetSubSidebarQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSubSidebarQuery>({ query: GetSubSidebarDocument, ...options });
};