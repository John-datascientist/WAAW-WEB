'use client';

import { useCallback, useEffect, useState } from 'react';

export type AcademyRoleChoice = 'founder' | 'investor';

const KEY = 'waaw-academy-track-choice';

// Which of the two tracks the visitor wants to see on /academy. Device-level
// (not tied to a signed-in account) since it's just a display preference
// anyone can change any time, not something that needs to follow you across
// devices.
export function useAcademyTrackChoice() {
  const [choice, setChoiceState] = useState<AcademyRoleChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw === 'founder' || raw === 'investor') setChoiceState(raw);
    } catch {
      // no-op — just falls back to unset
    }
    setReady(true);
  }, []);

  const setChoice = useCallback((next: AcademyRoleChoice) => {
    setChoiceState(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // no-op — the choice just won't persist this session
    }
  }, []);

  return { choice, setChoice, ready };
}
