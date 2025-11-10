import { Card, Descriptions } from "antd";
import type { User } from "../shared/types/jsonPlaceholder";
import { Link } from "react-router-dom";
import { FileTextOutlined, PictureOutlined, UserOutlined } from "@ant-design/icons";

interface UserCardProps {
  user: User;
  onDrawerOpen: (userId: number, type: "posts" | "albums") => void;
}
export default function UserCard({ user, onDrawerOpen }: UserCardProps) {
  return (
    <Card
      title={
        <Link to={`/users/${user.id}`}>
          <UserOutlined /> {user.username}
        </Link>
      }
      actions={[
        <FileTextOutlined
          onClick={(_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            onDrawerOpen(user.id, "posts");
          }}
        />,
        <PictureOutlined
          onClick={(_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            onDrawerOpen(user.id, "albums");
          }}
        />,
      ]}
    >
      <Descriptions title="User Info">
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
