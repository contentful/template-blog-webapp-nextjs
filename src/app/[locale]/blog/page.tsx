import { BlogPosts } from '@src/components/features/blog';
import { fetchPosts } from '@src/lib/fetchpost';

interface ContentFullBlogProps {
  params: { locale: string };
  searchParams: {
    page?: string;
    preview?: string;
  };
}

export default async function ContentFullBlog({ params, searchParams }: ContentFullBlogProps) {
  const raw = searchParams?.page;
  const parsedPage = parseInt(raw ?? '1', 10);
  const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  
  const preview = searchParams.preview === 'true';
  const locale = params.locale;

  const postsPerPage = 6;
  const posts = await fetchPosts(page, postsPerPage, preview);

  const totalPosts = posts.totalPosts;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <section id="blog" className="py-12">
      <div className="container mx-auto px-4">
        <BlogPosts
          posts={posts.items}
          totalPosts={totalPosts}
          currentPage={page}
          totalPages={totalPages}
          locale={locale}
          preview={preview}
        />
      </div>
    </section>
  );
}
