"use client";
import { Button, Col, Row, Table } from "antd";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SearchS1 } from "../search/SearchS1";
import { useCallback, useState } from "react";
import { TableRowSelection } from "antd/es/table/interface";
import { ExportExcel } from "../exports/ExportExcel";
import { PiExport } from "react-icons/pi";
import DeleteModal from "../modal/DeleteModal";
import { MdDelete } from "react-icons/md";

type TableServerPaginationType = {
  columns: object[];
  data: {
    _id: number;
    id: number;
    key: number;
  }[];
  onSelectedChange?: (newSelectedRowKeys: number[]) => void;
  isLoading?: boolean;
  exportedName?: string;
  deleteHeading?: string;
  deleteDescription?: string;
  handleDelete?: (ids: number[]) => void;
  totalItems?: number;
};

export const TableServerPagination = ({
  columns,
  data,
  onSelectedChange,
  isLoading,
  exportedName,
  deleteHeading,
  deleteDescription,
  handleDelete,
  totalItems,
}: TableServerPaginationType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedRowKeysState, setSelectedRowKeysState] = useState<number[]>(
    []
  );

  const [selectedRows, setSelectedRows] = useState<object[]>([]);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearchFilter = (value: string) => {
    router.replace(pathname + "?" + createQueryString("search", value));
  };

  const handlePagination = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    // params.set("per_page", "15"); // optional

    router.push(`?${params.toString()}`);
  };

  // Ensure each data object has a unique key
  const modifiedDataSource = data?.map((row) => ({
    ...row,
    key: row.id || row.key || row._id,
  }));

  const rowSelection: TableRowSelection<object> = {
    columnWidth: "80px",
    selectedRowKeys: selectedRowKeysState,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows) => {
      const numericKeys = newSelectedRowKeys.map((key) => Number(key));
      setSelectedRowKeysState(numericKeys);
      setSelectedRows(selectedRows);
      if (onSelectedChange) {
        onSelectedChange(numericKeys);
      }
    },
  };

  return (
    <div className="tableS1">
      <div className="tableHeader">
        <Row gutter={[16, 20]} align="middle" justify="space-between">
          <Col xs={24} xl={12}>
            <SearchS1
              placeholder="بحث...."
              value={searchValue}
              handleChange={(value) => {
                setSearchValue(value);
                handleSearchFilter(value);
              }}
            />
          </Col>

          <Col xs={24} xl={8}>
            <div className="flex w-full items-center justify-end gap-4">
              {/* {exportedName && (
                <ExportExcel
                  data={
                    selectedRows.length > 0 ? selectedRows : modifiedDataSource
                  }
                  fileName={`${exportedName}.csv`}
                  columns={columns}
                  disabled={isLoading}
                >
                  <Button type="primary" className="w-full">
                    <PiExport className="text-2xl" /> Export
                  </Button>
                </ExportExcel>
              )} */}
              {handleDelete && (
                <DeleteModal
                  heading={deleteHeading || "Delete selected items?"}
                  description={
                    deleteDescription ||
                    "Are you sure you want to delete the selected items?"
                  }
                  deleteLoading={false}
                  handleDelete={async () => {
                    await handleDelete(selectedRowKeysState);
                  }}
                >
                  <Button
                    type="default"
                    disabled={selectedRows.length === 0}
                    className="delete-btn disabled:opacity-25"
                  >
                    <MdDelete className="text-2xl text-secondary" /> Delete
                  </Button>
                </DeleteModal>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <Table
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={modifiedDataSource}
        loading={isLoading}
        pagination={{
          pageSize: 6,
          total: totalItems,
          current: currentPage,
          onChange: (pageNumber) => handlePagination(pageNumber),
          // nextIcon: <img src={PaginationNextIcon} alt="next" />,
          // prevIcon: <img src={PaginationPrevIcon} alt="prev" />,
          showSizeChanger: false,
        }}
        scroll={{
          x: "max-content",
          y: 540,
        }}
      />
    </div>
  );
};
