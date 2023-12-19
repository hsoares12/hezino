import { Blog } from "@prisma/client";

export default function ShowcaseBlogs({ blogs }: { blogs: Blog[] }) {
  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.slug} className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                data-slot="icon"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                />
              </svg>
            </div>

            <h2>{blog.title}</h2>
          </dt>

          <dd className="mt-2 text-base leading-7 text-gray-600">
            {blog.description}
          </dd>
        </div>
      ))}
    </>
  );
}
