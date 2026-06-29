import { CSVLink } from "react-csv";

type ExportExcelType = {
  children: JSX.Element;
  data: object[];
  fileName: string;
  columns: object[];
  disabled?: boolean;
};

export const ExportExcel = ({
  children,
  data,
  columns,
  fileName,
  disabled,
}: ExportExcelType) => {
  if (disabled || !data || data.length === 0) return children;

  type RowType = { [key: string]: any };

  return (
    <CSVLink
      data={data}
      // headers={headers}
      filename={fileName}
      className="w-full"
    >
      {children}
    </CSVLink>
  );
};
