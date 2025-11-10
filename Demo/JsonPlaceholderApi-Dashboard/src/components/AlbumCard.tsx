import { Card } from "antd";
import { Link } from "react-router-dom";
import type { Album } from "../shared/types/jsonPlaceholder";
import { useGetUserByIdQuery } from "../api/jsonPlaceholderApi";
import { UserOutlined, PictureOutlined } from "@ant-design/icons";
import { replaceSimbols } from "../shared/hooks";

interface AlbumCardProps {
  item: Album;
  onAlbumClick?: (albumId: number) => void;
}
export default function AlbumCard({ item, onAlbumClick }: AlbumCardProps) {
  const { data, isLoading } = useGetUserByIdQuery(item.userId);
  const username = data?.username || "Unknown person";

  return (
    <Card
      loading={isLoading}
      title={
        <Link to={replaceSimbols(username)}>
          <UserOutlined /> {username}
        </Link>
      }
      actions={[
        <PictureOutlined
          onClick={(_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            onAlbumClick?.(item.id);
          }}
        />,
      ]}
    >
      <Card.Meta title={item.title} />
    </Card>
  );
}
