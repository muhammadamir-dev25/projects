import { Card, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import type { StatDefinition } from "../shared/types/dashboard";

interface StatCardProps {
  def: StatDefinition;
}

export default function StatCard({ def }: StatCardProps) {
  const { data, isLoading } = def.useQueryHook();

  return (
    <Col key={def.id} xl={6} lg={8} md={12} sm={12} xs={24}>
      <Card
        title={def.title}
        extra={<Link to={def.to}>More</Link>}
        loading={isLoading}
      >
        <Statistic
          title={def.title + " length:"}
          value={data?.length || 0}
          // formatter={formatter}
        />
      </Card>
    </Col>
  );
}
