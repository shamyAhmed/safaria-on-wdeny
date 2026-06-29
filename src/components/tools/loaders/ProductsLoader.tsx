import { Skeleton, Card, Col, Row } from "antd";

interface ProductsLoaderProps {
  count?: number;
}

export const ProductsLoader: React.FC<ProductsLoaderProps> = ({
  count = 6,
}) => {
  return (
    <Row gutter={[16, 16]} className="mb-4">
      {Array.from({ length: count }).map((_, index) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          <Card
            key={index}
            className="rounded-lg border border-gray-200 shadow-sm"
          >
            {/* Image Skeleton */}
            <Skeleton.Image
              active
              className="!h-48 !w-full mb-4"
              style={{ width: "100%", height: "192px" }}
            />

            {/* Title Skeleton */}
            <Skeleton
              active
              paragraph={false}
              title={{ width: "75%" }}
              className="mb-2"
            />

            {/* Description Skeleton */}
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 2, width: ["100%", "85%"] }}
              className="mb-3"
            />

            {/* Rating and Price Skeleton */}
            <div className="space-y-3">
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1, width: "40%" }}
                className="mb-3"
              />

              {/* Price and Button Row */}
              <div className="flex items-center justify-between">
                <Skeleton.Button active size="small" className="!w-24" />
                <Skeleton.Button active size="default" className="!w-28" />
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
