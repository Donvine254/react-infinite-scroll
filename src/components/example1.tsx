/*Use vanilla react with intersection observer and custom hook */
import { useState, useRef, useCallback } from "react";
import usePosts from "../hooks/use-posts";
import type { Post } from "../types";
import { PostCard } from "./postcard";
import { Loader2 } from "lucide-react";

const Example1 = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (post: HTMLElement | null) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="center">Error: {error.message}</p>;

  const content = results.map((post: Post, i: number) => {
    if (results.length === i + 1) {
      return <PostCard ref={lastPostRef} key={post.id} post={post} />;
    }
    return <PostCard key={post.id} post={post} />;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <h1
        id="top"
        className="text-2xl font-bold text-gray-900 mb-4 text-center">
        React Infinite Scroll – Example 1
      </h1>
      <div className="grid grid-cols-1  gap-6"> {content}</div>

      {isLoading && (
        <div className="flex items-center space-x-2 py-2 justify-center">
          <Loader2 className="size-4 animate-spin" />{" "}
          <span>Loading More Posts..</span>
        </div>
      )}
      <div className="text-center py-2">
        <a href="#top" className="hover:text-blue-500 hover:underline">
          ↑ Back to Top
        </a>
      </div>
    </div>
  );
};

export default Example1;
