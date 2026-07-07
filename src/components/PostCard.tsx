"use client";

import { ReactionBar } from "@/components/ReactionBar";
import type { Post } from "@/types";

type Props = {
  post: Post;
  guestId: string;
};

function formatTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();

  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "たった今";

  if (diffMin < 60) {
    return `${diffMin}分前`;
  }

  const diffHour = Math.floor(diffMin / 60);

  if (diffHour < 24) {
    return `${diffHour}時間前`;
  }

  const diffDay = Math.floor(diffHour / 24);

  return `${diffDay}日前`;
}

export function PostCard({
  post,
  guestId,
}: Props) {
  return (
    <article
      aria-label={`投稿（${formatTime(post.created_at)}）`}
      className="
        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-5

        shadow-lg
        shadow-black/20

        backdrop-blur-sm

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-white/15
        hover:shadow-xl
        hover:shadow-black/30
      "
    >
      {/* 投稿本文 */}

      <p
        className="
          whitespace-pre-wrap
          break-words

          text-[15px]
          leading-8

          tracking-[0.01em]

          text-zinc-100
        "
      >
        {post.body}
      </p>

      {/* 投稿日時 */}

      <div
        className="
          mt-4

          flex
          items-center
          justify-between
        "
      >
        <time
          dateTime={post.created_at}
          className="
            text-xs

            tracking-wide

            text-zinc-500
          "
        >
          {formatTime(post.created_at)}
        </time>
      </div>

      {/* Divider */}

      <div
        className="
          mt-5

          border-t
          border-white/10

          pt-4
        "
      >
        <ReactionBar
          postId={post.id}
          guestId={guestId}
        />
      </div>
    </article>
  );
}