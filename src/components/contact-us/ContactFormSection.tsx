"use client";

import { Form, Input, Button, Row, Col } from "antd";
import { PhoneInput } from "./PhoneInput";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useContactUs } from "@/hooks/useContactUs";

export function ContactFormSection() {
  const [form] = Form.useForm();
  const t = useTranslations("contactUs");
  const tLabels = useTranslations("contactUs.inputs.labels");
  const tPlaceholders = useTranslations("contactUs.inputs.placeholders");
  const tValidation = useTranslations("contactUs.inputs.validation");
  const { submitContact, isSubmitting } = useContactUs();

  const handleSubmit = async (values: any) => {
    await submitContact({
      name: values.fullName,
      email: values.email,
      phone: `+${values.phonecode}${values.mobile}`,
      message: values.message,
    });
    form.resetFields();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form side */}
      <div className="flex-1">
        <div className="h-full">
          <h2 className="text-primary font-bold text-3xl mb-8">
            {t("formTitle")}
          </h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="formS1 !border-none !p-0"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <div className="inputS1">
                  <Form.Item
                    name="fullName"
                    label={tLabels("fullName")}
                    rules={[{ required: true, message: tValidation("fullNameRequired") }]}
                  >
                    <Input placeholder={tPlaceholders("fullName")} />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24}>
                <div className="inputS1">
                  <Form.Item
                    name="email"
                    label={tLabels("email")}
                    rules={[{ required: true, type: "email", message: tValidation("emailRequired") }]}
                  >
                    <Input placeholder={tPlaceholders("email")} />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24}>
                <PhoneInput />
              </Col>
              <Col xs={24}>
                <div className="inputS1">
                  <Form.Item
                    name="message"
                    label={tLabels("message")}
                    rules={[
                      { required: true, message: tValidation("messageRequired") },
                      { min: 25, message: tValidation("messageMinLength") },
                    ]}
                  >
                    <Input.TextArea
                      placeholder={tPlaceholders("message")}
                      rows={5}
                      className="!rounded-2xl"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block size="large" loading={isSubmitting}>
                    {t("submit")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      {/* Image side */}
      <div className="flex-1">
        <div
          className="relative rounded-[30px] overflow-hidden"
          style={{ minHeight: "450px", height: "100%" }}
        >
          <Image
            src="/images/contact-us.webp"
            fill
            objectFit="cover"
            alt={t("imageAlt")}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
            <Image
              src="/images/logo-white.png"
              width={180}
              height={90}
              alt={t("logoAlt")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
