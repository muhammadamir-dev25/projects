import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Album,
  Comment,
  Photo,
  Post,
  Todo,
  User,
} from "../shared/types/jsonPlaceholder";

export const jsonPlaceholderApi = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    // POSTS
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
    getPostsByUser: builder.query<Post[], number>({
      query: (userId) => `posts?userId=${userId}`,
    }),

    // COOMMENTS
    getCommnets: builder.query<Comment[], void>({
      query: () => "comments",
    }),
    getCommentsByPost: builder.query<Comment[], number>({
      query: (postId) => `comments?postId=${postId}`,
    }),

    // ALBUMS
    getAlbums: builder.query<Album[], void>({
      query: () => "albums",
    }),
    getAlbumsByUser: builder.query<Album[], number>({
      query: (userId) => `albums?userId=${userId}`,
    }),

    // PHOTOS
    getPhotos: builder.query<Photo[], void>({
      query: () => "photos",
    }),
    getPhotoByAlbum: builder.query<Photo[], number>({
      query: (albumId) => `photos?albumId=${albumId}`,
    }),

    // TODOS
    getTodos: builder.query<Todo[], void>({
      query: () => "todos",
    }),
    getTodoByUser: builder.query<Todo[], number>({
      query: (userId) => `todos/${userId}`,
    }),

    // USERS
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<User, number>({
      query: (userId) => `users/${userId}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserQuery,
  useGetCommnetsQuery,
  useGetCommentsByPostQuery,
  useGetAlbumsQuery,
  useGetAlbumsByUserQuery,
  useGetPhotosQuery,
  useGetPhotoByAlbumQuery,
  useGetTodosQuery,
  useGetTodoByUserQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
} = jsonPlaceholderApi;
