/**
 * 投稿
 */
export type Post = {
  id: string;
  guest_id: string;
  body: string;
  created_at: string;
};

/**
 * 利用可能なリアクション一覧
 */
export const REACTIONS = [
  "otsukare",
  "okiteru",
  "wakaru",
  "naiteru",
  "ganbare",
] as const;

/**
 * リアクション種別
 */
export type ReactionType =
  (typeof REACTIONS)[number];

/**
 * リアクション
 */
export type PostReaction = {
  id: string;
  post_id: string;
  guest_id: string;
  reaction: ReactionType;
  created_at: string;
};

/**
 * リアクション件数
 */
export type ReactionCounts =
  Record<ReactionType, number>;