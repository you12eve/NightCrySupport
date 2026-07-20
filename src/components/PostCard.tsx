"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { ReactionBar } from "@/components/ReactionBar";
import type { Post } from "@/types";

type Props = {
  post: Post;
  guestId: string;
};

function formatTime(iso: string) {
  const diffMs =
    Date.now() -
    new Date(iso).getTime();

  const diffMin = Math.floor(
    diffMs / 60000
  );

  if (diffMin < 1) {
    return "たった今";
  }

  if (diffMin < 60) {
    return `${diffMin}分前`;
  }

  const diffHour = Math.floor(
    diffMin / 60
  );

  if (diffHour < 24) {
    return `${diffHour}時間前`;
  }

  const diffDay = Math.floor(
    diffHour / 24
  );

  return `${diffDay}日前`;
}

export function PostCard({
  post,
  guestId,
}: Props) {
  const cardRef =
  useRef<HTMLElement | null>(null);

  const timerRef =
    useRef<number | null>(null);

  const movedRef =
    useRef(false);

  const [isOpen, setIsOpen] =
    useState(false);

  const [pressed, setPressed] =
    useState(false);

  const [isTouchDevice, setIsTouchDevice] =
    useState(false);

  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    );
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutside = (
      event: MouseEvent
    ) => {
      if (
        !cardRef.current?.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
    };
  }, [isOpen]);

  const clearPress =
    useCallback(() => {
      if (timerRef.current) {
        clearTimeout(
          timerRef.current
        );

        timerRef.current = null;
      }

      setPressed(false);
    }, []);

  const handlePointerDown =
    useCallback(() => {
      if (!isTouchDevice) {
        return;
      }

      movedRef.current = false;

      setPressed(true);

      timerRef.current =
        window.setTimeout(() => {
          if (!movedRef.current) {
            setIsOpen(true);
          }

          setPressed(false);
        }, 450);
    }, [isTouchDevice]);

  const handlePointerMove =
    useCallback(() => {
      movedRef.current = true;
      clearPress();
    }, [clearPress]);

  const handlePointerUp =
    useCallback(() => {
      clearPress();
    }, [clearPress]);

  const handleClick =
    useCallback(() => {
      if (isTouchDevice) {
        return;
      }

      setIsOpen((prev) => !prev);
    }, [isTouchDevice]);
  return (
    <article
      ref={cardRef}
      aria-label={`投稿（${formatTime(
        post.created_at
      )}）`}
      onClick={handleClick}
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={
        handlePointerUp
      }
      onPointerLeave={
        handlePointerUp
      }
      className={[
        `
        relative

        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-5

        shadow-lg
        shadow-black/20

        backdrop-blur-sm

        transition-all
        duration-150

        select-none
        `,

        pressed
          ? "scale-[0.96]"
          : "",

        isOpen
          ? "border-[#7c6ff7]/50 -translate-y-1 shadow-xl shadow-[#7c6ff7]/10"
          : "hover:-translate-y-0.5 hover:border-white/15 hover:shadow-xl hover:shadow-black/30",
      ].join(" ")}
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
          dateTime={
            post.created_at
          }
          className="
            text-xs

            tracking-wide

            text-zinc-500
          "
        >
          {formatTime(
            post.created_at
          )}
        </time>
      </div>

      {/* Reaction */}

      <div
        className="
          mt-4

          border-t
          border-white/10

          pt-3
        "
      >
        <ReactionBar
          postId={post.id}
          guestId={guestId}
          isOpen={isOpen}
          onClose={() =>
            setIsOpen(false)
          }
        />
      </div>
    </article>
  );
}