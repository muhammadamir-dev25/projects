import { Card, Col, Descriptions, Row } from "antd";
import { useGetUserByIdQuery } from "../api/jsonPlaceholderApi";
import { useParams } from "react-router-dom";

export default function User() {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading } = useGetUserByIdQuery(Number(userId));

  return (
    <Row>
      <Col span={24}>
        <Card loading={isLoading} title={data?.username}>
          <Descriptions title="User Info">
            <Descriptions.Item label="ID">{data?.id}</Descriptions.Item>
            <Descriptions.Item label="name">{data?.name}</Descriptions.Item>
            <Descriptions.Item label="Telephone">
              {data?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Live">
              {data?.address.city}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
}
