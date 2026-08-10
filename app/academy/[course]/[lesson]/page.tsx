import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InvestorNav } from '../../../../src/components/InvestorNav';
import { BackButton } from '../../../../src/components/ui';
import { LessonCompleteToggle, LockedBanner } from '../../../../src/components/AcademyProgressControls';
import { ACADEMY_COURSES, findLesson } from '../../../../src/data/academyCourses';

export function generateStaticParams() {
  return ACADEMY_COURSES.flatMap((course) =>
    course.lessons.map((lesson) => ({ course: course.slug, lesson: lesson.slug }))
  );
}

// The source articles use **bold** for a handful of inline terms (e.g.
// "**SAFE**"). Rendering that as real emphasis rather than literal
// asterisks without pulling in a markdown parser for four short files.
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-medium text-tx">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function AcademyLessonPage({ params }: { params: { course: string; lesson: string } }) {
  const found = findLesson(params.course, params.lesson);
  if (!found) notFound();
  const { course, lesson } = found;

  const sorted = [...course.lessons].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((l) => l.slug === lesson.slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  const showCourseHero = course.heroUrl && lesson.order === 1;

  return (
    <main className="min-h-screen bg-bg">
      <InvestorNav />

      {showCourseHero && (
        <div className="relative h-[45vh] w-full overflow-hidden bg-[#150a24] sm:h-[55vh]">
          <iframe src={course.heroUrl} title={`${course.title} | WAAW Academy`} className="h-full w-full border-0" loading="lazy" />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-6 py-16">
        <BackButton fallbackHref="/academy" label="Academy" />

        <LockedBanner courseSlug={course.slug} />

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-puXlight px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-pu">
            {course.title}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-mu">
            Lesson {lesson.order} of {sorted.length} · {lesson.level} · {lesson.readMins} min
          </span>
        </div>
        <h1 className="mb-3 font-serif text-3xl text-tx">{lesson.title}</h1>
        <p className="mb-6 font-sans text-sm font-light italic leading-relaxed text-mu">{lesson.teaser}</p>

        {lesson.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={lesson.image.src}
            alt={lesson.image.alt}
            className="mb-10 w-full rounded-lg border border-ln bg-card"
          />
        )}

        <div className="space-y-8">
          {lesson.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="mb-2 font-sans text-sm font-semibold text-tx">{s.heading}</h2>
              {s.list ? (
                <ul className="list-disc space-y-1.5 pl-5">
                  {s.body.map((line, i) => (
                    <li key={i} className="font-sans text-sm font-light leading-relaxed text-mu">
                      {renderInline(line)}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-3">
                  {s.body.map((para, i) => (
                    <p key={i} className="font-sans text-sm font-light leading-relaxed text-mu">
                      {renderInline(para)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 font-sans text-xs font-light italic text-mu">
          WAAW Academy is educational and general. It is not investment, legal, or tax advice.
        </p>

        <LessonCompleteToggle courseSlug={course.slug} lessonSlug={lesson.slug} />

        <div className="mt-8 flex items-center justify-between border-t border-ln pt-6">
          {prev ? (
            <Link href={`/academy/${course.slug}/${prev.slug}`} className="font-mono text-xs uppercase tracking-wider text-mu hover:text-pu">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/academy/${course.slug}/${next.slug}`} className="font-mono text-xs uppercase tracking-wider text-pu hover:text-pu3">
              {next.title} →
            </Link>
          ) : (
            <Link href="/academy" className="font-mono text-xs uppercase tracking-wider text-pu hover:text-pu3">
              Back to Academy →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
