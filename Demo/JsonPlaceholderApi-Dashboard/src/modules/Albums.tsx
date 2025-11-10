import { Divider, List, Spin } from "antd";
import { useEffect, useState } from "react";
import { useGetAlbumsQuery } from "../api/jsonPlaceholderApi";
import type { Album } from "../shared/types/jsonPlaceholder";
import InfiniteScroll from "react-infinite-scroll-component";
import AlbumCard from "../components/AlbumCard";
import AlbumDrawer from "../components/AlbumDrawer";

export default function Albums() {
  const { data = [], isLoading } = useGetAlbumsQuery();
  const [visibleAlbums, setVisibleAlbums] = useState<Album[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

  useEffect(() => {
    if (data.length) {
      setVisibleAlbums(data.slice(0, 20));
      setHasMore(data.length > 20);
    }
  }, [data]);

  const loadMore = () => {
    if (isFetching) return;
    setIsFetching(true);

    setTimeout(() => {
      const next = visibleAlbums.length + 10;
      setVisibleAlbums(data.slice(0, next));
      setHasMore(next < data.length);
      setIsFetching(false);
    }, 500);
  };

  if (isLoading && visibleAlbums.length === 0) {
    return (
      <Divider>
        <Spin size="large" />
      </Divider>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={visibleAlbums.length}
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
          dataSource={visibleAlbums}
          renderItem={(item: Album) => (
            <List.Item>
              <AlbumCard
                item={item}
                onAlbumClick={(albumId: number) => setSelectedAlbumId(albumId)}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <AlbumDrawer
        albumId={selectedAlbumId}
        onClose={() => setSelectedAlbumId(null)}
      />
    </>
  );
}
