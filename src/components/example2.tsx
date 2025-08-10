/*Use infinite-query with intersection observer */
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback } from "react";

import { Loader2 } from "lucide-react";
import type { Post } from "../types";
import { getPostsPage } from "../api/posts";
import { PostCard } from "./postcard";

const Example2 = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Post[]>({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => getPostsPage(pageParam as number),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length + 1 : undefined,
      initialPageParam: 1,
    });

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (post: HTMLElement | null) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const content = data?.pages.flatMap((pg, pageIndex) =>
    pg.map((post, i, arr) => {
      const isLastCard =
        pageIndex === data.pages.length - 1 &&
        i === arr.length - 1 &&
        hasNextPage;
      return (
        <PostCard
          key={post.id}
          post={post}
          ref={isLastCard ? lastPostRef : undefined}
        />
      );
    })
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <h1
        id="top"
        className="text-2xl font-bold text-gray-900 mb-4 text-center">
        React Infinite Scroll – Example 2
      </h1>
      <div className="grid grid-cols-1  gap-6"> {content}</div>

      {isFetchingNextPage && (
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

export default Example2;
