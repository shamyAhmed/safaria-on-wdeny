import Dragger from "antd/es/upload/Dragger";
import React from "react";
import toast from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";

interface UploadPDFProps {
  pdf: File | null;
  setPDF: (pdf: File) => void;
}

export const UploadPDF = ({ pdf, setPDF }: UploadPDFProps) => {
  const isPDF = (file: File) => {
    return file.type === "application/pdf";
  };

  const handleBeforeUpload = (file: File) => {
    if (!isPDF(file)) {
      toast.error(`${file.name} is not a valid PDF file.`);
      return false;
    }
    setPDF(file);
    return false; // Prevent default upload behavior
  };

  const props = {
    name: "file",
    multiple: false,
    beforeUpload: handleBeforeUpload,
    showUploadList: false,
    accept: "application/pdf",
  };

  return (
    <Dragger {...props}>
      <div className="flex flex-col items-center justify-center gap-1">
        <FiUploadCloud className="text-6xl" />
        {pdf ? (
          <span>{pdf.name}</span>
        ) : (
          <span>Click to upload or Drag & Drop</span>
        )}
        <p className="ant-upload-hint">Only PDF files are supported</p>
      </div>
    </Dragger>
  );
};
