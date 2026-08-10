'use client';

import Link from 'next/link';
import { InvestorNav } from '../../src/components/InvestorNav';
import { useAcademyProgress } from '../../src/lib/useAcademyProgress';
import { useAcademyTrackChoice, type AcademyRoleChoice } from '../../src/lib/useAcademyTrackChoice';
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

const ROLE_OPTIONS: { key: AcademyRoleChoice; label: string; description: string }[] = [
  { key: 'founder', label: 'I’m a founder', description: 'Raising capital for my startup.' },
  { key: 'investor', label: 'I’m an investor', description: 'Looking to back early-stage startups.' },
];

function RoleQuestion({ choice, onChoose }: { choice: AcademyRoleChoice | null; onChoose: (c: AcademyRoleChoice) => void }) {
  return (
    <div className="mb-12 rounded-lg border border-ln bg-card p-6">
      <p className="mb-1 font-mono text-xs uppercase tracking-wider text-pu">Which brings you here?</p>
      <p className="mb-4 font-sans text-xs font-light text-mu">
        Pick one to see that track’s courses below. Foundations is open to everyone either way, and you can
        switch anytime.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {ROLE_OPTIONS.map((opt) => {
          const active = choice === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChoose(opt.key)}
              className={`rounded-md border p-4 text-left transition-colors ${
                active ? 'border-pu bg-puXlight' : 'border-ln hover:border-pu3'
              }`}
            >
              <span className="mb-1 block font-sans text-base font-medium text-tx">{opt.label}</span>
              <span className="font-sans text-xs font-light text-mu">{opt.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AcademyPage() {
  const { signedIn, completed } = useAcademyProgress();
  const { choice, setChoice } = useAcademyTrackChoice();

  const foundationsCourses = ACADEMY_COURSES.filter((c) => c.track === 'foundations');
  const trackCourses = choice ? ACADEMY_COURSES.filter((c) => c.track === choice) : [];

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
          Structured, self-paced courses: start with Foundations, free for everyone, then move into
          whichever track matches you. Finish a course to unlock the next one in that track. General
          education, not financial, legal, or tax advice.
        </p>
        {!signedIn && (
          <p className="mb-8 font-sans text-xs text-mu">
            <Link href="/signin" className="text-pu hover:text-pu3">Sign in</Link> to track your reading
            progress and unlock later courses.
          </p>
        )}

        <RoleQuestion choice={choice} onChoose={setChoice} />

        <div className="mb-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-pu">{TRACK_LABEL.foundations}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {foundationsCourses.map((course) => (
              <CourseCard key={course.slug} course={course} completed={completed} />
            ))}
          </div>
        </div>

        {choice && (
          <div className="mb-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-pu">{TRACK_LABEL[choice]}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {trackCourses.map((course) => (
                <CourseCard key={course.slug} course={course} completed={completed} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
