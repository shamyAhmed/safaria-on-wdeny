"use client";
import React from "react";
import style from "./style/checkout.module.scss";
import { Col, Form, Row } from "antd";
import { OrderSummary_section } from "./sections/OrderSummary_section";
import { Link } from "@/i18n/navigation";
import { useForm } from "antd/es/form/Form";
import { UserDetails } from "./sections/UserDetails";

export const CheckoutComponent = () => {
  const [form] = useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      //   becomePartnerMutation(values)
      //     .then(() => {
      //       form.resetFields();
      //       handleCancel();
      //     })
      //     .catch((errors) => {
      //       handleFormErrors(form, errors);
      //     });
    });
  };

  return (
    <div className={style.checkout}>
      <Form
        name="edit_about_page"
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <section className="py-24">
          <div className="container">
            <Row gutter={[30, 30]}>
              <Col span={24} lg={16}>
                <UserDetails />
              </Col>
              <Col span={24} lg={8}>
                <OrderSummary_section />
              </Col>
            </Row>{" "}
          </div>
        </section>{" "}
      </Form>
    </div>
  );
};
