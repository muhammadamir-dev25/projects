import { Card } from "antd";
import type { Post } from "../shared/types/jsonPlaceholder";
import { useGetUserByIdQuery } from "../api/jsonPlaceholderApi";
import { Link } from "react-router-dom";
import { UserOutlined, CommentOutlined } from "@ant-design/icons";

interface PostCardProps {
  item: Post;
  onCommentsClick?: (postId: number) => void;
}
export default function PostCard({ item, onCommentsClick }: PostCardProps) {
  const { data, isLoading } = useGetUserByIdQuery(item.userId);

  return (
    <Card
      loading={isLoading}
      title={
        <Link to={`/users/${data?.id}`} state={data?.id}>
          <UserOutlined /> {data?.username}
        </Link>
      }
      actions={[
        <CommentOutlined
          onClick={(_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            onCommentsClick?.(item.id);
          }}
        />,
      ]}
    >
      <Card.Meta title={item.title} description={item.body} />
    </Card>
  );
}
