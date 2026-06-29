"use client";
import { Table } from "antd";

type TableS2Props<T extends { _id: string }> = {
  columns: object[];
  data: T[];
  isLoading?: boolean;
};

export const TableS2 = <T extends { _id: string }>({
  columns,
  data,
  isLoading,
}: TableS2Props<T>) => {
  const modifiedDataSource = data?.map((row) => ({
    ...row,
    key: row._id, // AntD key comes from _id
  }));

  return (
    <div className="tableS1">
      <Table
        columns={columns}
        dataSource={modifiedDataSource}
        loading={isLoading}
        pagination={false}
        scroll={{
          x: "max-content",
          y: 540,
        }}
      />
    </div>
  );
};
