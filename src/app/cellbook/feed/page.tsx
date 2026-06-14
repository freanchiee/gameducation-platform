"use client";

import { useEffect, useMemo, useState } from "react";
import { createBrowserClient } from "@/lib/supabase-lb/client";
import { getCellbookSession } from "@/lib/cellbook/session";

interface FeedPostRow {
  id: string;
  student_id: string;
  caption: string | null;
  created_at: string;
}

interface StudentRow {
  id: string;
  display_name: string;
}

export default function CellBookFeedPage() {
  const [posts, setPosts] = useState<FeedPostRow[]>([]);
  const [studentsById, setStudentsById] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = getCellbookSession();
    const classId = session?.classId;
    if (!classId) {
      setError("No active student session. Choose a student first.");
      return;
    }

    const supabase = createBrowserClient();

    async function loadFeed() {
      const { data, error: feedError } = await supabase
        .from("feed_posts")
        .select("id,student_id,caption,created_at")
        .eq("class_id", classId)
        .order("created_at", { ascending: false })
        .limit(50);
      if (feedError) {
        setError(feedError.message);
        return;
      }
      const nextPosts = (data ?? []) as FeedPostRow[];
      setPosts(nextPosts);

      const studentIds = Array.from(new Set(nextPosts.map((p) => p.student_id)));
      if (studentIds.length === 0) return;
      const { data: students } = await supabase
        .from("students")
        .select("id,display_name")
        .in("id", studentIds);
      const map: Record<string, string> = {};
      ((students ?? []) as StudentRow[]).forEach((s) => {
        map[s.id] = s.display_name;
      });
      setStudentsById(map);
    }

    void loadFeed();

    const channel = supabase
      .channel("cellbook-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feed_posts", filter: `class_id=eq.${classId}` },
        () => void loadFeed()
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const renderedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        author: studentsById[post.student_id] ?? "Student",
      })),
    [posts, studentsById]
  );

  return (
    <div className="space-y-5">
      <h2 className="font-display text-3xl font-extrabold text-navy">Class Feed</h2>
      <p className="text-ink/70">Realtime class timeline powered by Supabase.</p>
      {error ? <p className="text-sm font-semibold text-red">Error: {error}</p> : null}
      <div className="grid gap-4">
        {renderedPosts.map((post) => (
          <article key={post.id} className="lb-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-navy">{post.author}</h3>
              <span className="text-xs font-semibold text-ink/60">
                {new Date(post.created_at).toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-ink/80">{post.caption ?? "New profile submission"}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
