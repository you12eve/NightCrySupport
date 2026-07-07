"use client";

import { useId } from "react";
import { PostForm } from "@/components/PostForm";
import { Timeline } from "@/components/Timeline";
import { useGuestId } from "@/hooks/useGuestId";
import { usePosts } from "@/hooks/usePosts";

export default function Home() {
  const guestId = useGuestId();

  const {
    posts,
    loading,
    addPost,
  } = usePosts();

  const descriptionId = useId();

  const handleSubmit = async (body: string) => {
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

            bg-[#0f0f14]/80
            backdrop-blur-xl

            px-5
            pt-5
            pb-4
          "
        >
          <h1
            className="
              text-xl
              font-bold
              tracking-wide
              text-white
            "
          >
            🌙 夜泣き・ワンオペ愚痴の駆け込み寺
          </h1>

          <p
            id={descriptionId}
            className="
              mt-2

              text-sm
              leading-7

              text-zinc-400
            "
          >
            アドバイス不要。
            <br />
            今の気持ちをそのまま吐き出そう。
          </p>
        </header>

        {/* Timeline */}
        <main
          id="main-content"
          aria-labelledby={descriptionId}
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

            bg-[#0f0f14]/80
            backdrop-blur-xl

            pb-[env(safe-area-inset-bottom)]
          "
        >
          <PostForm
            onSubmit={handleSubmit}
            disabled={!guestId}
          />
        </footer>
      </div>
    </>
  );
}