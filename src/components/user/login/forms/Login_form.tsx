"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useUserLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { useRouter, Link } from "@/i18n/navigation";
import { handleFormErrors } from "@/utils/handleFormError";
import "react-phone-input-2/lib/style.css";
import { PhoneInput } from "@/components/contact-us/PhoneInput";
import { useTranslations } from "next-intl";

type FieldType = {
  phonecode: string;
  mobile: string;
  password: string;
};

export const Login_form = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { loginMutation, loginLoading, error } = useUserLogin();
  const t = useTranslations("auth.login.form");
  const tLabels = useTranslations("auth.login.inputs.labels");
  const tValidation = useTranslations("auth.login.inputs.validation");

  const handleLogin = () => {
    form.validateFields().then((values) => {
      loginMutation(values)
        .then(() => form.resetFields())
        .catch((errors) => {
          handleFormErrors(form, errors);
          if (
            errors?.response?.status === 301 ||
            errors?.response?.data?.message === "Account not verified"
          ) {
            router.push(
              `/auth/verify-otp?mobile=${values.mobile}&phonecode=${values.phonecode}`
            );
          }
        });
    });
  };

  useEffect(() => {
    if (error) {
      form.setFields([
        {
          name: "mobile",
          errors: error?.response?.data?.message
            ? [error?.response?.data?.message]
            : [],
        },
      ]);
    }
  }, [error, form]);

  return (
    <>
      <Form
        name="login_form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={handleLogin}
        autoComplete="off"
      >
        {/* Hidden fields to store parsed values */}
        <Form.Item name="phonecode" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="mobile" hidden>
          <Input />
        </Form.Item>

        <div className="formS1 sectionS1 !border-none !p-0">
          <Row gutter={[28, 28]}>
            <Col xs={24} md={24}>
              <PhoneInput
                label={tLabels("phone")}
                requiredMessage={tValidation("phoneRequired")}
                minLengthMessage={tValidation("phoneInvalid")}
              />
            </Col>

            <Col xs={24}>
              <div className="inputS1">
                <Form.Item<FieldType>
                  label={tLabels("password")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: tValidation("passwordRequired"),
                    },
                  ]}
                >
                  <Input.Password placeholder={t("password.placeholder")} />
                </Form.Item>
              </div>
            </Col>

            <Link
              className="text-primary hover:text-primary ps-2 font-bold block w-full"
              href="/auth/forget-password"
            >
              {t("forgotPassword")}
            </Link>

            <Col xs={24}>
              <Button
                htmlType="submit"
                type="primary"
                disabled={loginLoading}
                loading={loginLoading}
                className="w-full"
              >
                {t("submit")}
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};
