import type { Blog } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getBlogs() {
  return prisma.blog.findMany();
}

export async function getBlog(slug: string) {
  return prisma.blog.findUnique({ where: { slug } });
}

export async function createBlog(
  blog: Pick<Blog, "slug" | "title" | "description" | "markdown">,
) {
  return prisma.blog.create({ data: blog });
}
