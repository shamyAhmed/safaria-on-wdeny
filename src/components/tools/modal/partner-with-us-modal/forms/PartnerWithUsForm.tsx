"use client";

import { handleFormErrors } from "@/utils/handleFormError";
import { Col, Form, Row, Input, Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useBecomePartner } from "../hooks/useBecomePartner";
import { useTranslations } from "next-intl";
const Option = Select;

interface PartnerWithUsFormProps {
  handleCancel: () => void;
}

export const PartnerWithUsForm = ({ handleCancel }: PartnerWithUsFormProps) => {
  const [form] = Form.useForm();
  const t = useTranslations("partnerWithUsModal.form");
  const { becomePartnerMutation, becomePartnerLoading } = useBecomePartner();

  const options = [
    {
      value: "Invest in Sanad or a Sanad startup",
      label: t("lookingTo.options.invest"),
    },
    {
      value: "Co-build startups with Sanad",
      label: t("lookingTo.options.co_build"),
    },
    {
      value: "Work with Sanad or a Sanad startup",
      label: t("lookingTo.options.work"),
    },
    {
      value: "Make a press inquiry",
      label: t("lookingTo.options.press"),
    },
    {
      value: "other",
      label: t("lookingTo.options.other"),
    },
  ];

  const handleBecomePartner = () => {
    form.validateFields().then((values) => {
      becomePartnerMutation(values)
        .then(() => {
          form.resetFields();
          handleCancel();
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  return (
    <Form
      name="partner_form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={form}
      onFinish={handleBecomePartner}
      autoComplete="off"
    >
      <div className="formS1 !border-none !p-0">
        <Row gutter={[11, 11]}>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={t("fullName")}
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: t("errors.fullName"),
                  },
                ]}
              >
                <Input placeholder={t("placeholders.fullName")} />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={t("email")}
                name="company_email"
                rules={[
                  {
                    required: true,
                    message: t("errors.email"),
                  },
                ]}
              >
                <Input placeholder={t("placeholders.email")} />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={t("phone")}
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: t("errors.phone"),
                  },
                ]}
              >
                <Input placeholder={t("placeholders.phone")} />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <div className="selectS1">
              <Form.Item
                label={t("lookingTo.label")}
                name="looking_to"
                rules={[
                  {
                    required: true,
                    message: t("lookingTo.error"),
                  },
                ]}
              >
                <Select placeholder={t("lookingTo.label")} options={options}>
                  {/* <Option value="Invest in Sanad or a Sanad startup">
                    {t("lookingTo.options.invest")}
                  </Option>
                  <Option value="Co-build startups with Sanad">
                    {t("lookingTo.options.co_build")}
                  </Option>
                  <Option value="Work with Sanad or a Sanad startup">
                    {t("lookingTo.options.work")}
                  </Option>
                  <Option value="Make a press inquiry">
                    {t("lookingTo.options.press")}
                  </Option>
                  <Option value="other">{t("lookingTo.options.other")}</Option> */}
                </Select>
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={t("message")}
                name="message"
                rules={[
                  {
                    required: true,
                    message: t("errors.organization"),
                  },
                ]}
              >
                <TextArea
                  cols={20}
                  rows={4.5}
                  placeholder={t("placeholders.message")}
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={becomePartnerLoading}
              loading={becomePartnerLoading}
              className="submit-btn w-full"
            >
              {t("submit")}
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
