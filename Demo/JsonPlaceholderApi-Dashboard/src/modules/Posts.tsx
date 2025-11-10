import { useState, useEffect } from "react";
import { Divider, List, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPostsQuery } from "../api/jsonPlaceholderApi";
import type { Post } from "../shared/types/jsonPlaceholder";
import PostCard from "../components/PostCard";
import CommentsDrawer from "../components/CommentsDrawer";

export default function Posts() {
  const { data = [], isLoading } = useGetPostsQuery();

  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    if (data.length) {
      setVisiblePosts(data.slice(0, 20));
      setHasMore(data.length > 20);
    }
  }, [data]);

  const loadMore = () => {
    if (isFetching) return;
    setIsFetching(true);

    setTimeout(() => {
      const next = visiblePosts.length + 10;
      setVisiblePosts(data.slice(0, next));
      setHasMore(next < data.length);
      setIsFetching(false);
    }, 500);
  };

  if (isLoading && visiblePosts.length === 0) {
    return (
      <Divider>
        <Spin size="large" />
      </Divider>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={visiblePosts.length}
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
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
          dataSource={visiblePosts}
          renderItem={(item: Post) => (
            <List.Item>
              <PostCard
                item={item}
                onCommentsClick={(postId: number) => setSelectedPostId(postId)}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>

      <CommentsDrawer
        postId={selectedPostId}
        onClose={() => setSelectedPostId(null)}
      />
    </>
  );
}
