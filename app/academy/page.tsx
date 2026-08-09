'use client';

import Link from 'next/link';
import { InvestorNav } from '../../src/components/InvestorNav';
import { useAcademyProgress } from '../../src/lib/useAcademyProgress';
import {
  ACADEMY_COURSES,
  courseCompletedCount,
  isCourseUnlocked,
  nextLessonToRead,
  previousCourseInTrack,
  type AcademyCourse,
  type AcademyTrack,
} from '../../src/data/academyCourses';

const TRACK_LABEL: Record<AcademyTrack, string> = {
  foundations: 'Start here',
  founder: 'Founder track',
  investor: 'Investor track',
};

const TRACK_ORDER: AcademyTrack[] = ['foundations', 'founder', 'investor'];

function CourseCard({ course, completed }: { course: AcademyCourse; completed: Set<string> }) {
  if (course.comingSoon) {
    return (
      <div className="rounded-lg border border-dashed border-ln bg-deeper p-5 opacity-70">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-sans text-base font-medium text-tx">{course.title}</h2>
          <span className="rounded-sm bg-ln px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-mu">
            Coming soon
          </span>
        </div>
        <p className="font-sans text-sm font-light leading-relaxed text-mu">{course.description}</p>
      </div>
    );
  }

  const unlocked = isCourseUnlocked(course.slug, completed);
  if (!unlocked) {
    const prev = previousCourseInTrack(course.slug);
    return (
      <div className="rounded-lg border border-dashed border-ln bg-deeper p-5 opacity-70" aria-disabled="true">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-sans text-base font-medium text-tx">🔒 {course.title}</h2>
          <span className="rounded-sm bg-ln px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-mu">
            Locked
          </span>
        </div>
        <p className="font-sans text-sm font-light leading-relaxed text-mu">
          {prev ? `Finish “${prev.title}” to unlock.` : 'Finish the previous course to unlock.'}
        </p>
      </div>
    );
  }

  const doneCount = courseCompletedCount(course, completed);
  const total = course.lessons.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const target = nextLessonToRead(course, completed);

  return (
    <Link
      href={`/academy/${course.slug}/${target?.slug ?? ''}`}
      className="block rounded-lg border border-ln bg-card p-5 transition-colors hover:border-pu3"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="font-sans text-base font-medium text-tx">{course.title}</h2>
        <div className="flex shrink-0 items-center gap-1.5">
          {course.free && (
            <span className="rounded-sm bg-ch px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-tx">
              Free
            </span>
          )}
          <span className="rounded-sm bg-puXlight px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-pu">
            {total} lessons
          </span>
        </div>
      </div>
      <p className="mb-3 font-sans text-sm font-light leading-relaxed text-mu">{course.description}</p>
      {doneCount > 0 && (
        <div>
          <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-deeper">
            <div className="h-1.5 rounded-full bg-ch transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-mu">
            {doneCount}/{total} read
          </p>
        </div>
      )}
    </Link>
  );
}

export default function AcademyPage() {
  const { signedIn, completed } = useAcademyProgress();

  return (
    <main className="min-h-screen bg-bg">
      <InvestorNav />

      {/* The 3D scene is a self-contained page (its own <head>, styles, and
          a Three.js CDN script) — an iframe keeps it fully isolated from
          the Next.js app instead of inlining a second React tree's worth
          of canvas/animation code into this page. */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-[#150a24] sm:h-[80vh]">
        <iframe
          src="/academy-hero.html"
          title="WAAW Academy"
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pu">WAAW Academy</p>
        <h1 className="mb-3 font-serif text-3xl text-tx">Courses for founders and investors</h1>
        <p className="mb-4 max-w-2xl font-sans text-sm font-light leading-relaxed text-mu">
          Structured, self-paced courses — start with Foundations, free for everyone, then move into
          whichever track matches you. Finish a course to unlock the next one in that track. General
          education, not financial, legal, or tax advice.
        </p>
        {!signedIn && (
          <p className="mb-10 font-sans text-xs text-mu">
            <Link href="/signin" className="text-pu hover:text-pu3">Sign in</Link> to track your reading
            progress and unlock later courses.
          </p>
        )}

        {TRACK_ORDER.map((track) => {
          const courses = ACADEMY_COURSES.filter((c) => c.track === track);
          if (courses.length === 0) return null;
          return (
            <div key={track} className="mb-12">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-pu">{TRACK_LABEL[track]}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {courses.map((course) => (
                  <CourseCard key={course.slug} course={course} completed={completed} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
