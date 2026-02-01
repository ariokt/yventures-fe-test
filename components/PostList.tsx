'use client';

import { Post } from '../hooks/usePosts';

interface PostsListProps {
  posts: Post[];
  selectedPostId?: number;
  onPostClick: (id: number) => void;
}

export default function PostsList({
  posts,
  selectedPostId,
  onPostClick,
}: PostsListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {posts.length === 1 ? 'Selected Post' : 'All Posts'}
      </h2>

      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {posts.map((post) => {
          const isSelected = selectedPostId === post.id;

          return (
            <button
              key={post.id}
              onClick={() => onPostClick(post.id)}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                    ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {post.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`
                      font-semibold text-sm mb-1 line-clamp-2
                      ${isSelected ? 'text-blue-900' : 'text-gray-900'}
                    `}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {post.body}
                  </p>
                </div>
                {isSelected && (
                  <svg
                    className="shrink-0 w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}