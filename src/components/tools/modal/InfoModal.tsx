import { ReactNode, useState } from "react";
import Modal from "antd/es/modal/Modal";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { FaCircleInfo } from "react-icons/fa6";

type InfoModalType = {
  img: string;
};

const InfoModal = ({ img }: InfoModalType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>
        <FaCircleInfo />
      </button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="550px"
        wrapClassName="infoModal"
        footer={null}
        centered
      >
        <div className="flex items-center justify-center p-4">
          <Image
            src={img}
            alt="Info image"
            className="rounded-lg"
            width={500}
            height={500}
          />
        </div>
      </Modal>
    </>
  );
};

export default InfoModal;
