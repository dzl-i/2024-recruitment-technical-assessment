import { Chip } from "./Chip"

type Course = {
  courseCode: string,
  courseTitle: string,
  averageStars: number,
  totalReviews: number,
  offeredTerms: string[]
}

export const Card = ({ course }: { course: Course }) => {
  const percentage = ((course.averageStars / 5) * 100).toFixed(1) + "%";

  return (
    <a href="/">
      <div className="flex rounded-xl px-6 py-7 shadow-lg mb-4 bg-[#f6f6f6]">
        <div className="flex-grow">
          <p className="text-2xl font-bold">{course.courseCode}</p>
          <p className="text-xs py-6">{course.courseTitle}</p>
          <div className="flex flex-wrap gap-2 mt-8">
            {course.offeredTerms.map(term => (
              <Chip key={term} term={term} />
            ))}
          </div>
        </div>

        <div className="flex flex-col right-0">
          <div className="relative inline-block text-[#e5e5e5]">
            <p className="text-2xl">★★★★★</p>
            <p className="text-2xl bg-[#B789E5] bg-clip-text absolute inset-0 text-transparent" style={{ width: percentage }}>★★★★★</p>
          </div>
          <p className="text-xs text-[#989898]">{course.totalReviews} reviews</p>
        </div>
      </div>
    </a>
  )
}
