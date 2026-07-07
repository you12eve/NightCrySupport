"use client";

import { useId, useState } from "react";

const MAX_LENGTH = 140;

type Props = {
  onSubmit: (body: string) => Promise<void>;
  disabled?: boolean;
};

export function PostForm({
  onSubmit,
  disabled,
}: Props) {
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] =
    useState(false);

  const counterId = useId();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const trimmed = body.trim();

    if (
      !trimmed ||
      submitting ||
      disabled
    ) {
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit(trimmed);

      setBody("");
    } catch (error: any) {
      if (
        error?.message === "RATE_LIMIT"
      ) {
        alert(
          "投稿が続いています。\n少し時間を空けてから投稿してください。"
        );
      } else {
        alert(
          "投稿できませんでした。\n時間をおいてもう一度お試しください。"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const remaining =
    MAX_LENGTH - body.length;

  return (
    <form
      onSubmit={handleSubmit}
      className="
        border-t
        border-white/10
        bg-[#0f0f14]/80
        px-4
        py-4
        backdrop-blur-xl
      "
    >
      <label
        htmlFor="post-body"
        className="sr-only"
      >
        投稿内容
      </label>

      <textarea
        id="post-body"
        aria-label="投稿内容"
        aria-describedby={counterId}
        value={body}
        onChange={(e) =>
          setBody(
            e.target.value.slice(
              0,
              MAX_LENGTH
            )
          )
        }
        placeholder={`今日も本当にお疲れさま。
今の気持ちをそのまま書いてみませんか？`}
        rows={4}
        disabled={
          disabled || submitting
        }
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-white/10
          bg-[#1a1a24]
          px-4
          py-3
          text-[15px]
          leading-7
          text-white
          placeholder:text-zinc-500
          shadow-inner
          transition-all
          duration-200
          focus:border-[#7c6ff7]
          focus:outline-none
          focus:ring-2
          focus:ring-[#7c6ff7]/40
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />

      <div
        className="
          mt-3
          flex
          items-center
          justify-between
        "
      >
        <span
          id={counterId}
          aria-live="polite"
          className={[
            "text-sm transition-colors",
            remaining <= 20
              ? "text-amber-400"
              : "text-zinc-500",
          ].join(" ")}
        >
          {body.length}/{MAX_LENGTH}
        </span>

        <button
          type="submit"
          disabled={
            !body.trim() ||
            submitting ||
            disabled
          }
          className="
            rounded-full
            bg-[#7c6ff7]
            px-6
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-200
            hover:scale-[1.03]
            hover:bg-[#8a7dff]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          {submitting
            ? "投稿中..."
            : "投稿する"}
        </button>
      </div>
    </form>
  );
}