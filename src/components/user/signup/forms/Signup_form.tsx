"use client";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useSignup } from "../hooks/useSignup";
import { handleFormErrors } from "@/utils/handleFormError";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { z, ZodError } from "zod";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { PhoneInput } from "@/components/contact-us/PhoneInput";
import { useTranslations } from "next-intl";

type FieldType = {
  firstName: string;
  phonecode: string;
  mobile: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const Signup_form = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAccepted = Form.useWatch("acceptPolicy", form);
  const mobileError = Form.useWatch("mobile_validator", form);

  const { signupMutation, signupLoading } = useSignup();
  const t = useTranslations("auth.register.form");
  const tLabels = useTranslations("auth.register.inputs.labels");
  const tValidation = useTranslations("auth.register.inputs.validation");

  const passwordSchema = z
    .string()
    .min(8, tValidation("passwordMinLength"))
    .regex(/[A-Z]/, tValidation("passwordUppercase"))
    .regex(/[a-z]/, tValidation("passwordLowercase"))
    .regex(/[0-9]/, tValidation("passwordNumber"));

  const zodPasswordValidator = async (_: any, value: string) => {
    try {
      passwordSchema.parse(value);
      return Promise.resolve();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return Promise.reject(new Error(error.issues[0]?.message));
      }
      return Promise.reject(new Error(tValidation("passwordInvalid")));
    }
  };

  const handleSignup = () => {
    form.validateFields().then((values) => {
      const { mobile_validator, acceptPolicy, confirmPassword, ...rest } =
        values;
      signupMutation({ ...rest, firebase_token: "010", code: "j" })
        .then(() => {
          const redirect = searchParams.get("redirect");
          const verifyUrl = redirect
            ? `/auth/verify-otp?mobile=${values.mobile}&phonecode=${values.phonecode}&redirect=${encodeURIComponent(redirect)}`
            : `/auth/verify-otp?mobile=${values.mobile}&phonecode=${values.phonecode}`;
          router.push(verifyUrl);
          form.resetFields();
        })
        .catch((errors) => {
          const apiErrors = errors?.response?.data?.errors;
          handleFormErrors(form, apiErrors);

          // If API returns a mobile error, show it on the mobile_validator field
          if (apiErrors?.mobile) {
            form.setFields([
              {
                name: "mobile_validator",
                errors: Array.isArray(apiErrors.mobile)
                  ? apiErrors.mobile
                  : [apiErrors.mobile],
              },
            ]);
          }
        });
    });
  };

  // Get mobile field errors to display under PhoneInput
  const mobileFieldErrors = form.getFieldError("mobile_validator");

  return (
    <>
      <Form
        name="signup_form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={handleSignup}
        autoComplete="off">
        {/* Hidden fields */}
        <Form.Item
          name="phonecode"
          hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="mobile"
          hidden>
          <Input />
        </Form.Item>

        <div className="formS1 sectionS1 !border-none !p-0">
          <Row gutter={[28, 28]}>
            <Col
              xs={24}
              md={24}>
              <div className="inputS1">
                <Form.Item
                  label={tLabels("fullName")}
                  name="name"
                  rules={[
                    { required: true, message: tValidation("fullNameRequired") },
                  ]}>
                  <Input placeholder={t("fullName.placeholder")} />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <PhoneInput
                label={tLabels("phone")}
                requiredMessage={tValidation("phoneRequired")}
                minLengthMessage={tValidation("phoneInvalid")}
              />
            </Col>

            <Col
              xs={24}
              md={24}>
              <div className="inputS1">
                <Form.Item
                  label={tLabels("email")}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: tValidation("emailRequired"),
                    },
                    {
                      type: "email",
                      message: tValidation("emailInvalid"),
                    },
                  ]}>
                  <Input autoComplete="hello" placeholder={t("email.placeholder")} />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <div className="inputS1">
                <Form.Item<FieldType>
                  label={tLabels("password")}
                  name="password"
                  rules={[
                    { required: true, message: tValidation("passwordRequired") },
                    { validator: zodPasswordValidator },
                  ]}>
                  <Input.Password autoComplete="new-password" placeholder={t("password.placeholder")} />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <div className="inputS1">
                <Form.Item<FieldType>
                  label={tLabels("confirmPassword")}
                  name="password_confirmation"
                  rules={[
                    { required: true, message: tValidation("confirmPasswordRequired") },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(tValidation("confirmPasswordMismatch")),
                        );
                      },
                    }),
                  ]}>
                  <Input.Password placeholder={t("confirmPassword.placeholder")} />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="acceptPolicy"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(tValidation("acceptPolicyRequired")),
                          ),
                  },
                ]}>
                <Checkbox>
                  <span className="text-sm">
                    {t("acceptPolicy.text")}{" "}
                    <Link
                      href="/pages/lshrot-o-l-hk-m"
                      target="_blank"
                      className="text-primary font-medium underline">
                      {t("acceptPolicy.link")}
                    </Link>
                  </span>
                </Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Button
                htmlType="submit"
                type="primary"
                disabled={signupLoading || !isAccepted}
                loading={signupLoading}
                className="w-full">
                {t("submit")}
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};
