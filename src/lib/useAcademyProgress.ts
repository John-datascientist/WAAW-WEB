'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function storageKey(userId: string) {
  return `waaw-academy-progress-${userId}`;
}

function lessonKey(courseSlug: string, lessonSlug: string) {
  return `${courseSlug}/${lessonSlug}`;
}

function load(userId: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function save(userId: string, completed: Set<string>) {
  try {
    window.localStorage.setItem(storageKey(userId), JSON.stringify([...completed]));
  } catch {
    // Progress just won't persist this session — not worth surfacing an error for.
  }
}

// Reading progress per signed-in account, stored in this browser's
// localStorage — the same lightweight, no-migration-needed pattern already
// used for the risk-acceptance flag in the commit flow. It doesn't follow a
// user across devices, but Academy progress isn't safety-critical, so that
// trade-off is fine for what this unlocks.
export function useAcademyProgress() {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompleted(user ? load(user.id) : new Set());
  }, [user]);

  const isLessonComplete = useCallback(
    (courseSlug: string, lessonSlug: string) => completed.has(lessonKey(courseSlug, lessonSlug)),
    [completed]
  );

  const setLessonComplete = useCallback(
    (courseSlug: string, lessonSlug: string, done: boolean) => {
      if (!user) return;
      setCompleted((prev) => {
        const next = new Set(prev);
        const key = lessonKey(courseSlug, lessonSlug);
        if (done) next.add(key);
        else next.delete(key);
        save(user.id, next);
        return next;
      });
    },
    [user]
  );

  return { signedIn: !!user, completed, isLessonComplete, setLessonComplete };
}
