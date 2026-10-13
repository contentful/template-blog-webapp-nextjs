'use client';

import { useRouter } from 'next/navigation';

import { ArticleTileGrid } from '@src/components/features/article';
import { Container } from '@src/components/shared/container';

export const BlogPosts = ({
  posts,
  currentPage,
  totalPages,
}: {
  posts: any[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  locale: string;
  preview: boolean;
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    // Change the URL to include the new page number, which will trigger a new server-side request
    router.push(`?page=${page}/#blogs`);
  };

  return (
    <Container className="my-8 px-4 md:mb-2 lg:mb-4">
      <br />
      <h2 id="blogs" className="mb-4 md:mb-6">
        🗞️ Blogs
      </h2>
      <ArticleTileGrid className="md:grid-cols-2 lg:grid-cols-3" articles={posts} />

      <div className="mt-8 flex justify-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 mx-1 rounded px-4 py-2"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 rounded px-4 py-2 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}

        <button
          className="bg-gray-200 hover:bg-gray-300 mx-1 rounded px-4 py-2"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </Container>
  );
};
