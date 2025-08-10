import React from "react";
import { User, MessageCircle } from "lucide-react";
import { type Post } from "../types";

interface PostCardProps {
  post: Post;
}

export const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  ({ post }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
        <div className="p-6">
          {/* Header with user info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">User {post.userId}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">Post #{post.id}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200 capitalize">
            {post.title}
          </h3>

          {/* Body */}
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {post.body}
          </p>

          {/* Read more button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 flex items-center space-x-1 group">
              <span>Read more</span>
              <svg
                className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

PostCard.displayName = "PostCard";
