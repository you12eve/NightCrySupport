"use client";

import { useCallback, useEffect, useState } from "react";
import supabase from "@/lib/supabase/client";
import type {
  ReactionCounts,
  ReactionType,
} from "@/types";

const EMPTY_COUNTS: ReactionCounts = {
  otsukare: 0,
  okiteru: 0,
  wakaru: 0,
  naiteru: 0,
  ganbare: 0,
};

export function useReactions(
  postId: string,
  guestId: string
) {
  const [counts, setCounts] =
    useState<ReactionCounts>(EMPTY_COUNTS);

  const [myReaction, setMyReaction] =
    useState<ReactionType | null>(null);

  const [loading, setLoading] =
    useState(true);

  const isTempPost = postId.startsWith("temp-");

  /**
   * リアクション一覧取得
   */
  const fetchReactions = useCallback(async () => {
    if (isTempPost) {
      setCounts(EMPTY_COUNTS);
      setMyReaction(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("post_reactions")
        .select("guest_id, reaction")
        .eq("post_id", postId);

      if (error) {
        throw error;
      }

      const next = {
        ...EMPTY_COUNTS,
      };

      let mine: ReactionType | null = null;

      for (const row of data ?? []) {
        const reaction =
          row.reaction as ReactionType;

        next[reaction]++;

        if (row.guest_id === guestId) {
          mine = reaction;
        }
      }

      setCounts(next);
      setMyReaction(mine);
    } catch (error) {
      console.error(
        "リアクション取得エラー",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [guestId, isTempPost, postId]);

  /**
   * スタンプ追加・変更・解除
   */
  const toggleReaction = useCallback(
    async (reaction: ReactionType) => {
      if (isTempPost) {
        return;
      }

      const { error } = await supabase.rpc(
        "toggle_reaction",
        {
          p_post_id: postId,
          p_guest_id: guestId,
          p_reaction: reaction,
        }
      );

      if (error) {
        console.error(
          "リアクション更新エラー",
          error
        );
      }
    },
    [guestId, isTempPost, postId]
  );

  /**
   * 初回取得
   */
  useEffect(() => {
    void fetchReactions();
  }, [fetchReactions]);

  /**
   * Realtime購読
   */
  useEffect(() => {
    if (isTempPost) {
      return;
    }

    const channel = supabase
      .channel(`reaction-${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "post_reactions",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          void fetchReactions();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [
    fetchReactions,
    isTempPost,
    postId,
  ]);

  return {
    counts,
    myReaction,
    loading,
    toggleReaction,
  };
}