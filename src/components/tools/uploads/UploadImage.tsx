import Dragger from "antd/es/upload/Dragger";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";

interface UploadImageProps {
  onUploaded: (urls: string[]) => void;
}

export const UploadImage = ({ onUploaded }: UploadImageProps) => {
  const handleBeforeUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image");
      return false;
    }

    const formData = new FormData();
    formData.append("images", file); // or "file" depending backend

    try {
      const { data } = await axiosInstance.post(
        "/products/upload-images",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onUploaded(data.data.images);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }

    return false; // stop antd auto upload
  };

  return (
    <Dragger beforeUpload={handleBeforeUpload} showUploadList={false}>
      <div className="flex flex-col items-center gap-1">
        <FiUploadCloud className="text-5xl" />
        <p>اضغط لرفع صور</p>
        <p className="ant-upload-hint">كل فورمات الصور متاحه</p>
      </div>
    </Dragger>
  );
};
