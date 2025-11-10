import { Divider, List, Spin } from "antd";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetUsersQuery } from "../api/jsonPlaceholderApi";
import type { User } from "../shared/types/jsonPlaceholder";
import UserCard from "../components/UserCard";
import UserDrawer from "../components/UserDrawer";

export default function Users() {
  const { data = [], isLoading } = useGetUsersQuery();
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [drawerType, setDrawerType] = useState<"posts" | "albums" | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    if (data.length) {
      setVisibleUsers(data.slice(0, 20));
      setHasMore(data.length > 20);
    }
  }, [data]);

  const loadMore = () => {
    if (isFetching) return;
    setIsFetching(true);

    setTimeout(() => {
      const next = visibleUsers.length + 10;
      setVisibleUsers(data.slice(0, next));
      setHasMore(next < data.length);
      setIsFetching(false);
    }, 500);
  };

  const handleDrawerClose = () => {
    setSelectedUserId(null);
    setDrawerType(null);
    console.log(1);
  };

  if (isLoading && visibleUsers.length === 0) {
    return (
      <Divider>
        <Spin size="large" />
      </Divider>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={visibleUsers.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <Divider plain>
            <Spin />
          </Divider>
        }
        style={{ overflow: "hidden" }}
      >
        <List
          loading={isLoading}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
          dataSource={visibleUsers}
          renderItem={(item: User) => (
            <List.Item>
              <UserCard
                user={item}
                onDrawerOpen={(userId, type) => {
                  setSelectedUserId(userId);
                  setDrawerType(type);
                }}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>

      <UserDrawer
        userId={selectedUserId}
        type={drawerType}
        onClose={handleDrawerClose}
      />
    </>
  );
}
