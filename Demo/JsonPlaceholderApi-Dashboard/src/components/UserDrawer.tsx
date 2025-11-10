import { Drawer, List } from "antd";
import {
  useGetAlbumsByUserQuery,
  useGetPostsByUserQuery,
} from "../api/jsonPlaceholderApi";
import type { Post, Album } from "../shared/types/jsonPlaceholder";
import PostCard from "./PostCard";
import AlbumCard from "./AlbumCard";

interface UserDrawerProps {
  userId: number | null;
  type: "posts" | "albums" | null;
  onClose: () => void;
}

export default function UserDrawer({ userId, type, onClose }: UserDrawerProps) {
  const show = userId !== null && type !== null;

  const postsQuery = useGetPostsByUserQuery(userId!, {
    skip: !show || type !== "posts",
  });
  const albumsQuery = useGetAlbumsByUserQuery(userId!, {
    skip: !show || type !== "albums",
  });

  const isLoading = postsQuery.isLoading || albumsQuery.isLoading;
  const data =
    type === "posts"
      ? postsQuery.data ?? []
      : albumsQuery.data ?? [];

  return (
    <Drawer
      title={type === "posts" ? "User posts" : "User albums"}
      open={show}
      onClose={onClose}
      placement="bottom"
      height="80vh"
    >
      <List
        loading={isLoading}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        dataSource={data}
        renderItem={(item: Post | Album) => (
          <List.Item>
            {type === "posts" ? (
              <PostCard item={item as Post} />
            ) : (
              <AlbumCard item={item as Album} />
            )}
          </List.Item>
        )}
      />
    </Drawer>
  );
}
