import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  FileTextOutlined,
  PictureOutlined,
  // CommentOutlined,
  // CheckSquareOutlined,
  // DatabaseOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import Title from "antd/es/typography/Title";
import type { MenuItemType } from "antd/es/menu/hooks/useItems";
const { Header, Sider, Content } = Layout;

const items: MenuItemType[] = [
  {
    key: "/",
    icon: <AppstoreOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "/posts",
    icon: <FileTextOutlined />,
    label: <Link to="/posts">Posts</Link>,
  },
  // {
  //   key: "/comments",
  //   icon: <CommentOutlined />,
  //   label: <Link to="/comments">Comments</Link>,
  // },
  {
    key: "/albums",
    icon: <PictureOutlined />,
    label: <Link to="/albums">Albums</Link>,
  },
  // {
  //   key: "/photos",
  //   icon: <DatabaseOutlined />,
  //   label: <Link to="/photos">Photos</Link>,
  // },
  // {
  //   key: "/todos",
  //   icon: <CheckSquareOutlined />,
  //   label: <Link to="/todos">Todos</Link>,
  // },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <Link to="/users">Users</Link>,
  },
];

export default function MainLayout() {
  const location = useLocation();

  return (
    <Layout className="main-layout">
      <Header className="main-header">
        <Title level={3}>JSON Placeholder API - Admin</Title>
      </Header>

      <Layout>
        <Sider className="main-sider" collapsible breakpoint="lg">
          <Menu items={items} selectedKeys={[location.pathname]} />
        </Sider>
        <Content className="main-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
