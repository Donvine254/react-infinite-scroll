import { useState, useRef, useCallback } from "react";
import usePosts from "../hooks/use-posts";
import type { Post } from "../types";
import { PostCard } from "./postcard";

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
    <>
      <h1 id="top">∞ Infinite Scroll – Example 1</h1>
      {content}
      {isLoading && <p className="center">Loading More Posts...</p>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </>
  );
};

export default Example1;
