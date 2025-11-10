import { Card, Drawer, List } from "antd";
import { useGetPhotoByAlbumQuery } from "../api/jsonPlaceholderApi";
import type { Photo } from "../shared/types/jsonPlaceholder";

interface AlbumDriwerProps {
  albumId: number | null;
  onClose: () => void;
}
export default function AlbumDrawer({ albumId, onClose }: AlbumDriwerProps) {
  const { data, isLoading } = useGetPhotoByAlbumQuery(albumId || 0, {
    skip: albumId === null,
  });

  return (
    <Drawer
      title="Album photos"
      open={albumId !== null}
      onClose={onClose}
      placement="bottom"
      height="90%"
    >
      <List
        loading={isLoading}
        dataSource={data}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        renderItem={(item: Photo) => (
          <List.Item>
            <Card
              cover={
                <img
                  alt={item.title}
                  src="https://picsum.photos/600?grayscale"
                  loading="lazy"
                />
              }
            >
                <Card.Meta title={item.title} />
            </Card>
          </List.Item>
        )}
      />
    </Drawer>
  );
}
