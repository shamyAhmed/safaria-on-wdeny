"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { z, ZodError } from "zod";
import { PhoneInput } from "@/components/contact-us/PhoneInput";
import { useTranslations } from "next-intl";

export const RegisterCompany_form = () => {
  const [form] = Form.useForm();
  const t = useTranslations("auth.registerCompany.form");
  const tLabels = useTranslations("auth.registerCompany.inputs.labels");
  const tValidation = useTranslations("auth.registerCompany.inputs.validation");

  const passwordSchema = z
    .string()
    .min(8, tValidation("passwordMinLength"))
    .regex(/[A-Z]/, tValidation("passwordUppercase"))
    .regex(/[a-z]/, tValidation("passwordLowercase"))
    .regex(/[0-9]/, tValidation("passwordNumber"));

  const zodPasswordValidator = async (_: unknown, value: string) => {
    try {
      passwordSchema.parse(value);
      return Promise.resolve();
    } catch (error) {
      if (error instanceof ZodError) {
        return Promise.reject(new Error(error.issues[0]?.message));
      }
      return Promise.reject(new Error(tValidation("passwordInvalid")));
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Register company account values:", values);
    });
  };

  return (
    <Form
      name="register_company_form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={form}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      {/* Hidden fields populated by PhoneInput */}
      <Form.Item name="phonecode" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="mobile" hidden>
        <Input />
      </Form.Item>

      <div className="formS1 sectionS1 !border-none !p-0">
        <Row gutter={[28, 28]}>
          {/* Name */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={tLabels("fullName")}
                name="name"
                rules={[{ required: true, message: tValidation("fullNameRequired") }]}
              >
                <Input placeholder={t("fullName.placeholder")} />
              </Form.Item>
            </div>
          </Col>

          {/* Email */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={tLabels("email")}
                name="email"
                rules={[
                  { required: true, message: tValidation("emailRequired") },
                  { type: "email", message: tValidation("emailInvalid") },
                ]}
              >
                <Input placeholder={t("email.placeholder")} />
              </Form.Item>
            </div>
          </Col>

          {/* Phone */}
          <Col xs={24}>
            <PhoneInput
              label={tLabels("phone")}
              requiredMessage={tValidation("phoneRequired")}
              minLengthMessage={tValidation("phoneInvalid")}
            />
          </Col>

          {/* Password */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={tLabels("password")}
                name="password"
                rules={[
                  { required: true, message: tValidation("passwordRequired") },
                  { validator: zodPasswordValidator },
                ]}
              >
                <Input.Password autoComplete="new-password" placeholder={t("password.placeholder")} />
              </Form.Item>
            </div>
          </Col>

          {/* Confirm Password */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={tLabels("confirmPassword")}
                name="password_confirmation"
                rules={[
                  { required: true, message: tValidation("confirmPasswordRequired") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(tValidation("confirmPasswordMismatch")));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t("confirmPassword.placeholder")} />
              </Form.Item>
            </div>
          </Col>

          {/* Submit */}
          <Col xs={24}>
            <Button htmlType="submit" type="primary" className="w-full">
              {t("submit")}
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
