import { Drawer, List } from "antd";
import { useGetCommentsByPostQuery } from "../api/jsonPlaceholderApi";
import type { Comment } from "../shared/types/jsonPlaceholder";

interface CommentsModalProps {
  postId: number | null;
  onClose: () => void;
}
export default function CommentsDrawer({
  postId,
  onClose,
}: CommentsModalProps) {
  const { data, isLoading } = useGetCommentsByPostQuery(postId || 0, {
    skip: postId === null,
  });

  return (
    <Drawer
      title="Post comments"
      open={postId !== null}
      onClose={onClose}
      placement="bottom"
      height="90%"
    >
      <List
        loading={isLoading}
        dataSource={data}
        renderItem={(item: Comment) => (
          <List.Item>
            <List.Item.Meta title={item.name} description={item.body} />
          </List.Item>
        )}
      />
    </Drawer>
  );
}
