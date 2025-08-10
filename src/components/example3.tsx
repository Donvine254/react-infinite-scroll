/*Use infinite-query with react-intersection-observer */
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import type { Post } from "../types";
import { getPostsPage } from "../api/posts";
import { PostCard } from "./postcard";
import { Loader2 } from "lucide-react";

const Example3 = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Post[]>({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => getPostsPage(pageParam as number),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length + 1 : undefined,
      initialPageParam: 1,
    });

  // Trigger fetch when last card is visible
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

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
          ref={isLastCard ? ref : undefined}
        />
      );
    })
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <h1
        id="top"
        className="text-2xl font-bold text-gray-900 mb-4 text-center">
        React Infinite Scroll – Example 3
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

export default Example3;
