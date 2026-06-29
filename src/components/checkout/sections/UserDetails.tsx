import { Col, Form, Input, Radio, RadioChangeEvent, Row } from "antd";
import { useState } from "react";
import ReactCodeInput from "react-code-input";

export const UserDetails = () => {
  const [code, setCode] = useState("");
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handleChange = (value: string) => {
    setCode(value);
  };
  return (
    <section>
      <div className="card">
        <div className="flex items-center gap-3 mb-8">
          <span className="rounded-full text-white font-bold flex items-center justify-center w-[40px] h-[40px] bg-primary">
            1
          </span>

          <h4 className="font-bold text-xl text-primary">بيانات العميل</h4>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="name"
                rules={[
                  {
                    required: true,
                    message: "ادخل الاسم بالكامل من فضلك!",
                  },
                ]}
              >
                <Input
                  placeholder="الاسم بالكامل "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="number"
                rules={[
                  {
                    required: true,
                    message: "ادخل رقم الجوال من فضلك!",
                  },
                ]}
              >
                <Input
                  placeholder="رقم الجوال "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="email"
                rules={[
                  {
                    required: true,
                    message: "ادخل البريد الالكتروني من فضلك!",
                  },
                  {
                    type: "email",
                    message: "ادخل بريد الكتروني صحيح من فضلك!",
                  },
                ]}
              >
                <Input
                  placeholder="البريد الإلكتروني "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>
      <div className="card">
        <div className="flex items-center gap-3 mb-8">
          <span className="rounded-full text-white font-bold flex items-center justify-center w-[40px] h-[40px] bg-primary">
            2
          </span>

          <h4 className="font-bold text-xl text-primary">العنوان الوطني</h4>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="national_address"
                rules={[
                  {
                    required: true,
                    message: "ادخل العنوان الوطني من فضلك!",
                  },
                ]}
              >
                <ReactCodeInput
                  type="text"
                  fields={8}
                  onChange={handleChange}
                  name={"national_address"}
                  inputMode="tel"
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>
      {/* <div className="card">
        <div className="flex items-center gap-3 mb-8">
          <span className="rounded-full text-white font-bold flex items-center justify-center w-[40px] h-[40px] bg-primary">
            3
          </span>

          <h4 className="font-bold text-xl text-primary">طريقة الشحن</h4>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="national_address"
                rules={[
                  {
                    required: true,
                    message: "ادخل الاسم بالكامل من فضلك!",
                  },
                ]}
              >
                <Radio.Group
                  onChange={onChange}
                  value={value}
                  options={[
                    { value: 1, label: "Option A" },
                    { value: 2, label: "Option B" },
                    { value: 3, label: "Option C" },
                    {
                      value: 4,
                      label: (
                        <>
                          More...
                          {value === 4 && (
                            <Input
                              variant="filled"
                              placeholder="please input"
                              style={{ width: 120, marginInlineStart: 12 }}
                            />
                          )}
                        </>
                      ),
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div> */}
    </section>
  );
};
