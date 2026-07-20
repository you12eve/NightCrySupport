"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { PostForm } from "@/components/PostForm";
import { Timeline } from "@/components/Timeline";

import { useGuestId } from "@/hooks/useGuestId";
import { usePosts } from "@/hooks/usePosts";

const OPENING_STORAGE_KEY =
  "nightcry-opening-shown";

const OPENING_MESSAGES = [
  "今日も一日、お疲れさまでした。",
  "投稿は毎朝6時に静かに消えていきます。",
  "誰かに答えを求める場所ではなく、",
  "今の気持ちをそっと置いていける場所です。",
  "思っていることを、",
  "そのまま吐き出してみてください。",
] as const;

export default function Home() {
  const guestId = useGuestId();

  const {
    posts,
    loading,
    addPost,
  } = usePosts();

  const [
    showOpening,
    setShowOpening,
  ] = useState(false);

  const [
    closing,
    setClosing,
  ] = useState(false);

  const [
    visibleLines,
    setVisibleLines,
  ] = useState(0);

  useEffect(() => {
    const alreadyShown =
      localStorage.getItem(
        OPENING_STORAGE_KEY
      );

    if (alreadyShown) {
      return;
    }

    setShowOpening(true);

    document.body.style.overflow =
      "hidden";

    const timers: number[] = [];

    OPENING_MESSAGES.forEach(
      (_, index) => {
        timers.push(
          window.setTimeout(() => {
            setVisibleLines(
              index + 1
            );
          }, 500 + index * 550)
        );
      }
    );

    timers.push(
      window.setTimeout(() => {
        setClosing(true);
      }, 5200)
    );

    timers.push(
      window.setTimeout(() => {
        localStorage.setItem(
          OPENING_STORAGE_KEY,
          "true"
        );

        document.body.style.overflow =
          "";

        setShowOpening(false);
      }, 5800)
    );

    return () => {
      timers.forEach((timer) =>
        clearTimeout(timer)
      );

      document.body.style.overflow =
        "";
    };
  }, []);

  const handleSubmit = async (
    body: string
  ) => {
    if (!guestId) return;

    await addPost(body, guestId);
  };

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="
          sr-only

          focus:not-sr-only
          focus:absolute
          focus:left-4
          focus:top-4
          focus:z-50

          rounded-lg
          bg-[#7c6ff7]

          px-4
          py-2

          text-sm
          font-medium
          text-white

          shadow-xl

          focus:outline-none
          focus:ring-2
          focus:ring-white
        "
      >
        メインコンテンツへ移動
      </a>

      {/* Fixed Background */}
      <div
        aria-hidden="true"
        className="
          fixed
          inset-0
          -z-10

          bg-gradient-to-b
          from-[#231d40]
          via-[#171722]
          to-[#0c0c10]
        "
      />

      {/* Opening Overlay */}
      {showOpening && (
        <div
          role="dialog"
          aria-modal="true"
          aria-live="polite"
          className={[
            "fixed inset-0 z-50",
            "flex items-center justify-center",
            "bg-[#0c0c10]",
            "transition-opacity duration-700",
            closing
              ? "opacity-0"
              : "opacity-100",
          ].join(" ")}
        >
          <div
            className="
              mx-6
              w-full
              max-w-md

              rounded-3xl

              border
              border-white/10

              bg-[#171722]

              px-8
              py-10

              text-center

              shadow-2xl
            "
          >
            <div
              className="
                animate-[fadeIn_700ms_ease-out]

                text-6xl
              "
            >
              🌙
            </div>

            <div
              className="
                mt-8
                space-y-5

                text-[15px]
                leading-8

                text-zinc-200
              "
            >
              {OPENING_MESSAGES.map(
                (message, index) => (
                  <p
                    key={message}
                    className={[
                      "transition-all duration-700",
                      visibleLines >
                      index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0",
                    ].join(" ")}
                  >
                    {message}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* App */}
      <div
        className="
          mx-auto
          flex

          h-[100dvh]
          max-h-[100dvh]

          w-full
          max-w-[480px]

          flex-col
        "
      >
        {/* Header */}
        <header
          role="banner"
          className="
            sticky
            top-0
            z-20

            shrink-0

            border-b
            border-white/10

            bg-[#0f0f14]/90
            backdrop-blur-xl

            px-5
            py-3
          "
        >
          <h1
            className="
              flex
              items-center
              gap-2

              text-base
              font-bold
              tracking-wide
              text-white
            "
          >
            <span
              aria-hidden="true"
              className="text-lg"
            >
              🌙
            </span>

            夜泣き・ワンオペ愚痴の駆け込み寺
          </h1>
        </header>

        {/* Timeline */}
        <main
          id="main-content"
          className="
            flex-1

            min-h-0

            overflow-y-auto
            overscroll-contain

            px-4
            py-5

            scroll-smooth
          "
        >
          <Timeline
            posts={posts}
            loading={loading}
            guestId={guestId ?? ""}
          />
        </main>

        {/* Footer */}
        <footer
          role="contentinfo"
          className="
            sticky
            bottom-0
            z-20

            shrink-0

            border-t
            border-white/10

            bg-[#0f0f14]/90
            backdrop-blur-xl

            pb-[env(safe-area-inset-bottom)]
          "
        >
          <PostForm
            onSubmit={handleSubmit}
            disabled={!guestId}
          />

          <nav
            aria-label="フッターリンク"
            className="
              flex
              justify-center
              gap-4

              pb-4

              text-xs
              text-zinc-500
            "
          >
            <Link
              href="/terms"
              className="
                transition-colors
                hover:text-zinc-300
              "
            >
              利用規約
            </Link>

            <Link
              href="/privacy"
              className="
                transition-colors
                hover:text-zinc-300
              "
            >
              プライバシーポリシー
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}