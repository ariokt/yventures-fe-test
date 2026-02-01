'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface UsePostsReturn {
  posts: Post[];
  comments: Comment[];
  isLoading: boolean;
  isLoadingComments: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPostById: (id: number) => Promise<void>;
  clearSearch: () => void;
  selectedPost: Post | null;
}

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        const data: Post[] = await response.json();
        setAllPosts(data);
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const searchPostById = useCallback(async (id: number) => {
    if (!id || isNaN(id)) {
      setPosts(allPosts);
      setSelectedPost(null);
      setComments([]);
      return;
    }

    try {
      setIsLoadingComments(true);
      setError(null);

      const foundPost = allPosts.find(post => post.id === id);
      
      if (foundPost) {
        setPosts([foundPost]);
        setSelectedPost(foundPost);

        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${id}`
        );

        if (!commentsResponse.ok) {
          throw new Error(`Failed to fetch comments: ${commentsResponse.status}`);
        }

        const commentsData: Comment[] = await commentsResponse.json();
        setComments(commentsData);
      } else {
        setPosts([]);
        setSelectedPost(null);
        setComments([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comments');
      console.error('Error fetching comments:', err);
      setComments([]);
    } finally {
      setIsLoadingComments(false);
    }
  }, [allPosts]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setPosts(allPosts);
    setSelectedPost(null);
    setComments([]);
  }, [allPosts]);

  return {
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
  };
}