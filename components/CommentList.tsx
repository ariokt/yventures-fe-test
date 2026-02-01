'use client';

import { Comment } from '../hooks/usePosts';

interface CommentsListProps {
  comments: Comment[];
  isLoading: boolean;
  postTitle: string;
}

export default function CommentsList({
  comments,
  isLoading,
  postTitle,
}: CommentsListProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Comments ({comments.length})
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">{postTitle}</p>
      </div>
      {comments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">💬</div>
          <p className="text-gray-600">No comments yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Be the first to comment on this post
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {comment.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`mailto:${comment.email}`}
                      className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {comment.email}
                    </a>
                  </div>
                </div>
                <span className="text-xs text-gray-400">#{index + 1}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}