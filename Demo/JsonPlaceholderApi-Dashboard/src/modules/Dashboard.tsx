import { Row } from "antd";

import {
  CheckSquareOutlined,
  // CommentOutlined,
  // DatabaseOutlined,
  // FileTextOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";

import StatCard from "../components/StatCard";
import type { StatDefinition } from "../shared/types/dashboard";
import {
  // useGetCommnetsQuery,
  // useGetPhotosQuery,
  // useGetTodosQuery,
  useGetAlbumsQuery,
  useGetPostsQuery,
  useGetUsersQuery,
} from "../api/jsonPlaceholderApi";

export default function Dashboard() {
  const STATS_DEFINITIONS: StatDefinition[] = [
    {
      id: 1,
      title: "Posts",
      to: "/posts",
      icon: <CheckSquareOutlined />,
      useQueryHook: useGetPostsQuery,
    },
    // {
    //   id: 2,
    //   title: "Comments",
    //   to: "/comments",
    //   icon: <CommentOutlined />,
    //   useQueryHook: useGetCommnetsQuery,
    // },
    {
      id: 3,
      title: "Albums",
      to: "/albums",
      icon: <PictureOutlined />,
      useQueryHook: useGetAlbumsQuery,
    },
    // {
    //   id: 4,
    //   title: "Photos",
    //   to: "/photos",
    //   icon: <DatabaseOutlined />,
    //   useQueryHook: useGetPhotosQuery,
    // },
    // {
    //   id: 5,
    //   title: "Todos",
    //   to: "/todos",
    //   icon: <FileTextOutlined />,
    //   useQueryHook: useGetTodosQuery,
    // },
    {
      id: 6,
      title: "Users",
      to: "/users",
      icon: <UserOutlined />,
      useQueryHook: useGetUsersQuery,
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {STATS_DEFINITIONS.map((def) => {
        return <StatCard key={def.id} def={def} />;
      })}
    </Row>
  );
}
