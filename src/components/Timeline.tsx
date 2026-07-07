import { PostCard } from "@/components/PostCard";
import type { Post } from "@/types";

type Props = {
  posts: Post[];
  loading: boolean;
  guestId: string;
};

export function Timeline({
  posts,
  loading,
  guestId,
}: Props) {
  if (loading) {
    return (
      <div
        className="
          flex
          flex-col
          gap-5
          py-2
        "
        aria-label="投稿を読み込み中"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              animate-pulse

              rounded-3xl

              border
              border-white/10

              bg-white/5

              p-5

              shadow-lg
              shadow-black/20
            "
          >
            <div className="h-5 w-4/5 rounded-full bg-white/10" />

            <div className="mt-4 h-5 w-3/5 rounded-full bg-white/10" />

            <div className="mt-7 h-12 rounded-2xl bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        className="
          flex
          h-full
          items-center
          justify-center
          px-6
          py-20
        "
      >
        <div className="max-w-sm text-center">
          <div className="text-6xl">
            🌙
          </div>

          <h2
            className="
              mt-6
              text-lg
              font-semibold
              text-white
            "
          >
            まだ投稿はありません
          </h2>

          <p
            className="
              mt-3

              text-sm
              leading-7

              text-zinc-400
            "
          >
            今日も一日お疲れさまでした。
            <br />
            今感じていることを、
            <br />
            最初のひとこととして残してみませんか。
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul
      className="
        flex
        flex-col
        gap-5

        pb-24
      "
      aria-label="投稿一覧"
    >
      {posts.map((post) => (
        <li
          key={post.id}
          className="
            animate-in
            fade-in
            slide-in-from-bottom-2

            duration-300
          "
        >
          <PostCard
            post={post}
            guestId={guestId}
          />
        </li>
      ))}
    </ul>
  );
}