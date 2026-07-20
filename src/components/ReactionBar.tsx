"use client";

import {
  useMemo,
  useState,
} from "react";

import { useReactions } from "@/hooks/useReactions";

import type {
  ReactionType,
} from "@/types";

type Props = {
  postId: string;
  guestId: string;

  isOpen: boolean;
  onClose: () => void;
};

const REACTIONS: {
  type: ReactionType;
  emoji: string;
  label: string;
}[] = [
  {
    type: "otsukare",
    emoji: "😮‍💨",
    label: "お疲れ様",
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
    label: "泣きな",
  },
  {
    type: "ganbare",
    emoji: "💪",
    label: "がんばれ",
  },
];

const REACTION_MAP: Record<
  ReactionType,
  string
> = {
  otsukare: "😮‍💨",
  okiteru: "🌙",
  wakaru: "🥹",
  naiteru: "🫂",
  ganbare: "💪",
};

export function ReactionBar({
  postId,
  guestId,
  isOpen,
  onClose,
}: Props) {
  const {
    counts,
    myReaction,
    loading,
    toggleReaction,
  } = useReactions(
    postId,
    guestId
  );

  const [pending, setPending] =
    useState(false);

  const total = useMemo(
    () =>
      Object.values(
        counts
      ).reduce(
        (sum, value) =>
          sum + value,
        0
      ),
    [counts]
  );

  if (loading) {
    return (
      <div className="mt-3">
        <div
          className="
            h-5
            w-32

            animate-pulse

            rounded-full

            bg-zinc-800
          "
        />
      </div>
    );
  }

  const handleClick = async (
    reaction: ReactionType
  ) => {
    if (pending) return;

    setPending(true);

    try {
      await toggleReaction(
        reaction
      );

      onClose();
    } finally {
      setTimeout(
        () =>
          setPending(false),
        250
      );
    }
  };

  return (
    <>
      {/* 共感人数 */}

<div
  className="
    flex
    items-center
    justify-between
    gap-3
  "
>
  <p
    className="
      text-xs
      text-zinc-400
      whitespace-nowrap
    "
    aria-live="polite"
  >
    {total} 人が共感しています
  </p>

  <div
    className="
      flex
      items-center
      -space-x-2
    "
    aria-hidden="true"
  >
    {(
      Object.entries(
        counts
      ) as [
        ReactionType,
        number
      ][]
    )
      .filter(
        ([, count]) =>
          count > 0
      )
      .slice(0, 5)
      .map(([type]) => (
        <span
          key={type}
          className="
            flex
            h-7
            w-7
            items-center
            justify-center

            rounded-full

            border
            border-white/10

            bg-[#22222d]

            text-sm

            shadow-md
          "
        >
          {REACTION_MAP[type]}
        </span>
      ))}
  </div>
</div>

      {/* LINE風リアクション */}

      <div
        className={[
          "absolute",

          "left-1/2",
          "-top-9",

          "-translate-x-1/2",

          "z-30",

          "transition-all duration-200",

          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
            : "pointer-events-none -translate-y-2 opacity-0 scale-95",
        ].join(" ")}
      >
        <div
          className="
            flex
            items-center
            gap-2

            rounded-full

            border
            border-white/5

            bg-[#22222d]

            px-3
            py-2

            shadow-xl
            shadow-black/40
          "
        >
          {REACTIONS.map(
            (item) => {
              const active =
                myReaction ===
                item.type;

              return (
                <button
                  key={item.type}
                  type="button"
                  disabled={
                    pending
                  }
                  aria-label={
                    item.label
                  }
                  aria-pressed={
                    active
                  }
                  onClick={() =>
                    void handleClick(
                      item.type
                    )
                  }
                  className={[
                    "flex",

                    "h-11",
                    "w-11",

                    "items-center",
                    "justify-center",

                    "rounded-full",

                    "transition-all",
                    "duration-150",

                    active
                      ? "scale-110 bg-[#7c6ff7]"
                      : "hover:scale-110 hover:bg-white/10",

                    pending
                      ? "opacity-60"
                      : "",

                    "active:scale-95",
                  ].join(" ")}
                >
                  <span
                    className="
                      text-2xl
                    "
                  >
                    {item.emoji}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}