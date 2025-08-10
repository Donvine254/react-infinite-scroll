import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

/**
 * Fetch a single page of posts
 * @param pageParam - The page number to fetch (default: 1)
 * @param options - Optional Axios request config
 * @returns An array of Post objects
 */
export const getPostsPage = async (
  pageParam: number = 1,
  options: AxiosRequestConfig = {}
): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/posts?_page=${pageParam}`, options);
  return response.data;
};
