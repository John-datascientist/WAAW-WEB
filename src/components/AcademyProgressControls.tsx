'use client';

import Link from 'next/link';
import { useAcademyProgress } from '../lib/useAcademyProgress';
import { isCourseUnlocked, previousCourseInTrack } from '../data/academyCourses';

export function LessonCompleteToggle({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
  const { signedIn, isLessonComplete, setLessonComplete } = useAcademyProgress();
  const done = isLessonComplete(courseSlug, lessonSlug);

  if (!signedIn) {
    return (
      <p className="mt-10 border-t border-ln pt-6 font-mono text-xs uppercase tracking-wider text-mu">
        <Link href="/signin" className="text-pu hover:text-pu3">Sign in</Link> to track your progress and unlock the next course.
      </p>
    );
  }

  return (
    <div className="mt-10 border-t border-ln pt-6">
      <button
        type="button"
        onClick={() => setLessonComplete(courseSlug, lessonSlug, !done)}
        className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
          done ? 'border-su bg-suLight text-su' : 'border-ln text-mu hover:border-pu3 hover:text-pu'
        }`}
      >
        <span>{done ? '✓' : '○'}</span>
        {done ? 'Marked as read' : 'Mark as read'}
      </button>
    </div>
  );
}

export function LockedBanner({ courseSlug }: { courseSlug: string }) {
  const { completed } = useAcademyProgress();
  if (isCourseUnlocked(courseSlug, completed)) return null;
  const prev = previousCourseInTrack(courseSlug);
  return (
    <div className="mb-8 rounded-md border border-warnBorder bg-warnLight px-4 py-3 font-sans text-xs text-warn">
      This course unlocks once you finish {prev ? `“${prev.title}”` : 'the previous course'}. You can still read this
      lesson, but{' '}
      <Link href="/academy" className="underline hover:no-underline">
        head back to the Academy
      </Link>{' '}
      to pick up where you left off.
    </div>
  );
}
