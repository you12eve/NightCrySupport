"use client";

import { useCallback, useEffect, useState } from "react";
import supabase from "@/lib/supabase/client";
import type { Post } from "@/types";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * 投稿一覧取得
   */
  const fetchPosts = useCallback(async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, guest_id, body, created_at")
        .order("created_at", {
          ascending: false,
        })
        .limit(100);

      if (error) {
        throw error;
      }

      setPosts(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 初回取得
   */
  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  /**
   * Realtime
   */
  useEffect(() => {
    const channel = supabase
      .channel("timeline")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          const newPost = payload.new as Post;

          setPosts((prev) => {
            if (prev.some((p) => p.id === newPost.id)) {
              return prev;
            }

            const withoutTemp = prev.filter(
              (p) =>
                !(
                  p.id.startsWith("temp-") &&
                  p.body === newPost.body &&
                  p.guest_id === newPost.guest_id
                )
            );

            return [newPost, ...withoutTemp];
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  /**
   * 投稿追加
   */
  const addPost = async (
    body: string,
    guestId: string
  ) => {
    const tempId = `temp-${crypto.randomUUID()}`;

    const optimisticPost: Post = {
      id: tempId,
      guest_id: guestId,
      body,
      created_at: new Date().toISOString(),
    };

    setPosts((prev) => [
      optimisticPost,
      ...prev,
    ]);

    try {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          guest_id: guestId,
          body,
        })
        .select(
          "id, guest_id, body, created_at"
        )
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        return;
      }

      setPosts((prev) =>
        prev.map((post) =>
          post.id === tempId
            ? data
            : post
        )
      );
    } catch (error: any) {
      setPosts((prev) =>
        prev.filter(
          (post) => post.id !== tempId
        )
      );

      if (
        error?.message ===
        "rate_limit_exceeded"
      ) {
        throw new Error("RATE_LIMIT");
      }

      throw error;
    }
  };

  return {
    posts,
    loading,
    addPost,
    fetchPosts,
  };
}