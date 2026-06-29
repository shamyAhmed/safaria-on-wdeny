"use client";

import { Button, Form } from "antd";
import { Input } from "antd";
import { useTranslations } from "next-intl";

export const NewsLetter_form = () => {
  const [form] = Form.useForm();
  const t = useTranslations("newsletter.form");

  const handleNewsLetter = () => {
    // form.validateFields().then((values) => {
    //   becomePartnerMutation(values)
    //     .then(() => {
    //       form.resetFields();
    //       handleCancel();
    //     })
    //     .catch((errors) => {
    //       handleFormErrors(form, errors);
    //     });
    // });
  };

  return (
    <Form
      name="newsletter_form"
      form={form}
      onFinish={handleNewsLetter}
      autoComplete="off"
    >
      <div className="input-button flex align">
        <div className="inputS1 flex-1">
          <Form.Item
            label={""}
            name="full_name"
            rules={[
              {
                required: true,
                message: t("errors.emailRequired"),
              },
            ]}
          >
            <Input placeholder={t("emailPlaceholder")} />
          </Form.Item>
        </div>
        <Button
          htmlType="submit"
          type="primary"
          //   disabled={becomePartnerLoading}
          //   loading={becomePartnerLoading}
          className="submit-btn w-full !rounded-[64px]"
        >
          {t("submit")}
        </Button>
      </div>
    </Form>
  );
};
