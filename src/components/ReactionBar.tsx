"use client";

import { useMemo } from "react";
import { useReactions } from "@/hooks/useReactions";
import type { ReactionType } from "@/types";

type Props = {
  postId: string;
  guestId: string;
};

const REACTIONS: {
  type: ReactionType;
  emoji: string;
  label: string;
}[] = [
  {
    type: "otsukare",
    emoji: "😮‍💨",
    label: "お疲れさま",
  },
  {
    type: "okiteru",
    emoji: "🌙",
    label: "起きてるよ",
  },
  {
    type: "wakaru",
    emoji: "🥹",
    label: "わかる",
  },
  {
    type: "naiteru",
    emoji: "🫂",
    label: "泣いていいよ",
  },
  {
    type: "ganbare",
    emoji: "💪",
    label: "応援してる",
  },
];

export function ReactionBar({
  postId,
  guestId,
}: Props) {
  const {
    counts,
    myReaction,
    loading,
    toggleReaction,
  } = useReactions(postId, guestId);

  const total = useMemo(
    () =>
      Object.values(counts).reduce(
        (sum, value) => sum + value,
        0
      ),
    [counts]
  );

  if (loading) {
    return (
      <div className="mt-2">
        <div className="h-12 animate-pulse rounded-2xl bg-white/5" />
      </div>
    );
  }

  return (
    <section
      aria-label="共感スタンプ"
      className="mt-2"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium tracking-wide text-zinc-400">
          共感スタンプ
        </p>

        <p className="text-xs text-zinc-500">
          {total} リアクション
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {REACTIONS.map((item) => {
          const active =
            myReaction === item.type;

          return (
            <button
              key={item.type}
              type="button"
              title={item.label}
              aria-label={`${item.label}（${counts[item.type]}件）`}
              aria-pressed={active}
              onClick={() =>
                toggleReaction(item.type)
              }
              className={[
                "group",
                "flex items-center gap-2",

                "rounded-full",

                "border",

                "px-3.5 py-2.5",

                "transition-all duration-200",

                "active:scale-95",

                "hover:-translate-y-0.5",

                active
                  ? `
                    border-[#7c6ff7]
                    bg-[#7c6ff7]/20

                    text-white

                    shadow-lg
                    shadow-[#7c6ff7]/20
                  `
                  : `
                    border-white/10

                    bg-white/5

                    text-zinc-300

                    hover:border-white/20
                    hover:bg-white/10
                  `,
              ].join(" ")}
            >
              <span
                className="
                  text-xl
                  transition-transform
                  duration-200
                  group-hover:scale-110
                "
              >
                {item.emoji}
              </span>

              <span
                className="
                  whitespace-nowrap

                  text-sm
                  font-medium
                "
              >
                {item.label}
              </span>

              <span
                className={[
                  "min-w-6",

                  "rounded-full",

                  "px-2 py-0.5",

                  "text-xs font-bold",

                  "text-center",

                  "transition-all",

                  active
                    ? `
                      bg-white/20
                      text-white
                    `
                    : `
                      bg-black/20
                      text-zinc-300
                      group-hover:bg-white/10
                    `,
                ].join(" ")}
              >
                {counts[item.type]}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}