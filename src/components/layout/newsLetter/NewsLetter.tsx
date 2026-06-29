"use client";

import { Col, Row } from "antd";
import { NewsLetter_form } from "./forms/NewsLetter_form";
import { FiFacebook } from "react-icons/fi";
import { PiYoutubeLogo } from "react-icons/pi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export const NewsLetter = () => {
  const t = useTranslations("newsletter");

  const socialLinks = [
    {
      href: "",
      icon: <FiFacebook />,
    },
    {
      href: "",
      icon: <FaXTwitter />,
    },
    {
      href: "",
      icon: <FaInstagram />,
    },
    {
      href: "",
      icon: <PiYoutubeLogo />,
    },
  ];
  return (
    <div className="newsletter py-10">
      <div className="container">
        <Row gutter={[40, 40]} className="items-center lg:text-center">
          <Col span={24} lg={10}>
            <h3 className="font-bold mb-3 text-2xl">{t("title")}</h3>
            <p className="text-[#2D2D31] text-md">{t("description")}</p>
          </Col>
          <Col span={24} lg={10}>
            <NewsLetter_form />
          </Col>
          <Col span={24} lg={4}>
            <ul className="social flex items-center justify-end gap-2 lg:justify-center">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-secondary text-3xl flex items-center justify-center  rounded-full hover:bg-secondary hover:text-white transition-colors duration-300 p-2`}
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};
