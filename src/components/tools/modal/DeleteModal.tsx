import { ReactNode, useState } from "react";
import Modal from "antd/es/modal/Modal";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { Button } from "antd";

type DeleteModalType = {
  children: ReactNode;
  deleteLoading: boolean;
  handleDelete?: () => Promise<void>;
  heading: string;
  description: string;
  buttonClassName?: string;
};

const DeleteModal = ({
  children,
  heading,
  description,
  handleDelete,
  deleteLoading,
  buttonClassName,
}: DeleteModalType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (handleDelete) {
      handleDelete().then(() => setIsModalOpen(false));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a className={buttonClassName} onClick={showModal}>
        {children}
      </a>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="550px"
        wrapClassName="deleteModal mainModal"
        loading={deleteLoading}
        centered
      >
        <div className="heading !border-b-[0px] align between flex">
          <h3 className="font-bold text-xl">{heading}</h3>
          <button className="closeBtn" onClick={handleCancel}>
            <AiOutlineClose />
          </button>
        </div>

        <p className=" my-2 mb-4">{description}</p>
        <div className="flex items-center justify-end mt-4">
          <Button
            type="primary"
            danger
            onClick={handleOk}
            className="!bg-[#EF4343] !border-[#EF4343] hover:!border-[#EF4343]"
            loading={deleteLoading}
          >
            حذف{" "}
          </Button>
          <Button type="default" onClick={handleCancel} className="ms-2">
            إلغاء
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
