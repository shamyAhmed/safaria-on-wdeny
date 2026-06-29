"use client";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useTranslations } from "next-intl";
import { CountrySelectInput } from "@/components/common/CountrySelectInput";
import { CountryCodeSelect } from "@/components/contact-us/CountryCodeSelect";
import { IoAdd } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

/* ── Per-row country code state ── */
function PhoneListItem({
  fieldName,
  index,
  canRemove,
  onRemove,
  label,
}: {
  fieldName: number;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  label?: string;
}) {
  const form = Form.useFormInstance();
  const t = useTranslations("auth.registerCompany.companyForm");

  return (
    <div className="inputS1">
      <Form.Item
        label={
          label ? (
            <div className="flex items-center justify-between w-full">
              <span>{label}</span>
            </div>
          ) : undefined
        }
        name={[fieldName, "number"]}
        rules={[
          { required: true, message: t("validation.phoneRequired") },
          { min: 8, message: t("validation.phoneInvalid") },
        ]}
      >
        <Input
          placeholder={t("placeholders.phone")}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            form.setFieldValue(["phones", fieldName, "number"], value);
          }}
          suffix={
            <div className="flex items-center gap-1">
              {canRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="flex items-center justify-center w-6 h-6 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <IoMdClose className="text-base" />
                </button>
              )}
              <CountryCodeSelect />
            </div>
          }
        />
      </Form.Item>
      {/* hidden phonecode */}
      <Form.Item name={[fieldName, "phonecode"]} hidden initialValue="20">
        <Input />
      </Form.Item>
    </div>
  );
}

/* ── Main form ── */
export const RegisterCompanyInfo_form = () => {
  const [form] = Form.useForm();
  const t = useTranslations("auth.registerCompany.companyForm");

  const handleSubmit = (values: unknown) => {
    console.log("Company info values:", values);
  };

  return (
    <Form
      name="register_company_info_form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={form}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <div className="formS1 sectionS1 !border-none !p-0">
        <Row gutter={[28, 28]}>
          {/* Company Name */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={t("labels.companyName")}
                name="company_name"
                rules={[{ required: true, message: t("validation.companyNameRequired") }]}
              >
                <Input placeholder={t("placeholders.companyName")} />
              </Form.Item>
            </div>
          </Col>

          {/* Country */}
          <Col xs={24}>
            <div className="inputS1">
              <CountrySelectInput
                name="country"
                label={t("labels.country")}
                placeholder={t("placeholders.country")}
                rules={[{ required: true, message: t("validation.countryRequired") }]}
              />
            </div>
          </Col>

          {/* Transportation Type */}
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label={t("labels.transportationType")}
                name="transportation_type"
                rules={[{ required: true, message: t("validation.transportationTypeRequired") }]}
              >
                <Select placeholder={t("placeholders.transportationType")}>
                  <Select.Option value="private_car">
                    {t("transportationTypes.privateCar")}
                  </Select.Option>
                  <Select.Option value="airplane">
                    {t("transportationTypes.airplane")}
                  </Select.Option>
                  <Select.Option value="bus">
                    {t("transportationTypes.bus")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Col>

          {/* Phone Numbers */}
          <Col xs={24}>
            <p className="text-sm font-medium text-[#707070] mb-3 capitalize">
              {t("labels.phoneNumbers")}
            </p>
            <Form.List
              name="phones"
              initialValue={[{ phonecode: "20", number: "" }]}
            >
              {(fields, { add, remove }) => (
                <div className="flex flex-col gap-3">
                  {fields.map((field, index) => (
                    <PhoneListItem
                      key={field.key}
                      fieldName={field.name}
                      index={index}
                      canRemove={fields.length > 1}
                      onRemove={() => remove(field.name)}
                    />
                  ))}

                  <button
                    type="button"
                    onClick={() => add({ phonecode: "20", number: "" })}
                    className="flex items-center gap-2 text-primary text-sm font-semibold hover:opacity-75 transition-opacity w-fit mt-1"
                  >
                    <IoAdd className="text-xl" />
                    {t("addPhone")}
                  </button>
                </div>
              )}
            </Form.List>
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
