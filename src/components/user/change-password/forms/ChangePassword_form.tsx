"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useForgetPassword } from "@/hooks/auth/useForgetPassword";
import { handleFormErrors } from "@/utils/handleFormError";
import "react-phone-input-2/lib/style.css";
import { PhoneInput } from "@/components/contact-us/PhoneInput";
import { useTranslations } from "next-intl";

export const ChangePassword_form = () => {
  const [form] = Form.useForm();
  const { forgetPasswordMutation, forgetPasswordLoading } = useForgetPassword();
  const t = useTranslations("auth.forgotPassword.form");
  const tLabels = useTranslations("auth.forgotPassword.inputs.labels");
  const tValidation = useTranslations("auth.forgotPassword.inputs.validation");

  const handleForgetPassword = (values: any) => {
    const payload = {
      mobile: Number(values.mobile),
      phonecode: Number(values.phonecode),
    };

    forgetPasswordMutation(payload).catch((errors) => {
      handleFormErrors(form, errors);
    });
  };

  return (
    <Form
      name="changePasswordFrom"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleForgetPassword}
      autoComplete="off"
    >
      <Form.Item name="phonecode" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="mobile" hidden>
        <Input />
      </Form.Item>

      <div className="formS1 sectionS1 !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <PhoneInput
              label={tLabels("phone")}
              requiredMessage={tValidation("phoneRequired")}
              minLengthMessage={tValidation("phoneInvalid")}
            />
          </Col>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={forgetPasswordLoading}
              loading={forgetPasswordLoading}
              className={`w-full !h-12 !rounded-xl text-lg font-bold`}
            >
              {t("submit")}
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};


