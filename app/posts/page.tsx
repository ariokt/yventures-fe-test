'use client';

import CommentsList from "@/components/CommentList";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import PostsList from "@/components/PostList";
import SearchBar from "@/components/SearchBar";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";

export default function PostsPage() {
  const {
    posts,
    comments,
    isLoading,
    isLoadingComments,
    error,
    searchQuery,
    setSearchQuery,
    searchPostById,
    clearSearch,
    selectedPost,
  } = usePosts();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  const showEmptyState = posts.length === 0 && !isLoading;

  return (
    <div className="max-w-7xl mx-auto py-24 md:p-24">
      <div className="flex items-center justify-between mb-4">
        <Link href={'/todos'} className="cursor-pointer">
          &#10216; Prev
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
        <p className="text-gray-600">
          Browse all posts or search by ID to view comments
        </p>
      </div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={searchPostById}
        onClear={clearSearch}
      />
      {selectedPost && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-green-800">
              Viewing Post id:{selectedPost.id}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {comments.length} {comments.length === 1 ? 'comment' : 'comments'} loaded
              </p>
            </div>
            <button
              onClick={clearSearch}
              className="text-sm text-green-700 hover:text-green-900 underline cursor-pointer"
            >
              View all posts
            </button>
          </div>
        </div>
      )}
      {showEmptyState ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={selectedPost ? 'lg:col-span-1' : 'lg:col-span-3'}>
            <PostsList
              posts={posts}
              selectedPostId={selectedPost?.id}
              onPostClick={(id : number) => {
                setSearchQuery(id.toString());
                searchPostById(id);
              }}
            />
          </div>
          {selectedPost && (
            <div className="lg:col-span-2">
              <CommentsList
                comments={comments}
                isLoading={isLoadingComments}
                postTitle={selectedPost.title}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}