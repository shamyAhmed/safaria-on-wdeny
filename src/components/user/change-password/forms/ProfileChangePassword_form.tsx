"use client";

import { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useChangePassword } from "../hooks/useChangePassword";
import { handleFormErrors } from "@/utils/handleFormError";
import { z, ZodError } from "zod";

const PASSWORD_REQUIREMENTS = [
    { test: (v: string) => v.length >= 8, label: "8 أحرف على الأقل" },
    { test: (v: string) => /[A-Z]/.test(v), label: "حرف كبير واحد على الأقل" },
    { test: (v: string) => /[a-z]/.test(v), label: "حرف صغير واحد على الأقل" },
    { test: (v: string) => /[0-9]/.test(v), label: "رقم واحد على الأقل" },
];

const PasswordStrengthMeter = ({ password }: { password: string }) => {
    const passedCount = PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length;
    const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

    if (!password) return null;

    return (
        <div className="max-w-[360px] mb-4 -mt-2">
            <div className="flex gap-1.5 mb-2">
                {PASSWORD_REQUIREMENTS.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i < passedCount ? strengthColors[passedCount - 1] : "bg-gray-200"
                        }`}
                    />
                ))}
            </div>
            <ul className="space-y-1">
                {PASSWORD_REQUIREMENTS.map((req, i) => {
                    const passed = req.test(password);
                    return (
                        <li
                            key={i}
                            className={`text-xs flex items-center gap-1.5 ${
                                passed ? "text-green-600" : "text-gray-400"
                            }`}
                        >
                            <span>{passed ? "✓" : "○"}</span>
                            {req.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export const ProfileChangePassword_form = () => {
    const [form] = Form.useForm();
    const [newPassword, setNewPassword] = useState("");
    const { changePasswordMutation, changePasswordLoading } = useChangePassword();

    const passwordSchema = z
        .string()
        .min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل")
        .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
        .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
        .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل");

    const zodPasswordValidator = async (_: any, value: string) => {
        if (!value) return Promise.resolve();
        try {
            passwordSchema.parse(value);
            return Promise.resolve();
        } catch (error: any) {
            if (error instanceof ZodError) {
                return Promise.reject(new Error(error.issues[0]?.message));
            }
            return Promise.reject(new Error("كلمة السر غير صالحة"));
        }
    };

    const onFinish = (values: any) => {
        changePasswordMutation(values)
            .then(() => {
                form.resetFields();
                setNewPassword("");
            })
            .catch((errors) => {
                const apiErrors = errors?.response?.data?.errors;
                handleFormErrors(form, apiErrors);
            });
    };

    return (
        <div className="formS1 !border-none">
            <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
                تغيير كلمة المرور
            </h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
            >
                <Row gutter={[24, 24]}>
                    <Col xs={24}>
                        <div className="inputS1">
                            <Form.Item
                                label="كلمة المرور الحالية"
                                name="current_password"
                                rules={[{ required: true, message: "يرجى إدخال كلمة المرور الحالية" }]}
                            >
                                <Input.Password
                                    placeholder="ادخل كلمة المرور"
                                    className="max-w-[360px]"
                                />
                            </Form.Item>
                        </div>
                    </Col>

                    <Col xs={24}>
                        <div className="inputS1">
                            <Form.Item
                                label="كلمة المرور الجديدة"
                                name="new_password"
                                rules={[
                                    { required: true, message: "يرجى إدخال كلمة المرور الجديدة" },
                                    { validator: zodPasswordValidator }
                                ]}
                            >
                                <Input.Password
                                    placeholder="ادخل كلمة المرور"
                                    className="max-w-[360px]"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Item>
                        </div>
                        <PasswordStrengthMeter password={newPassword} />
                    </Col>

                    <Col xs={24}>
                        <div className="inputS1">
                            <Form.Item
                                label="تأكيد كلمة المرور"
                                name="new_password_confirmation"
                                rules={[
                                    { required: true, message: "يرجى تأكيد كلمة المرور الجديدة" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("new_password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("كلمتا المرور غير متطابقتين"));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="ادخل كلمة المرور"
                                    className="max-w-[360px]"
                                />
                            </Form.Item>
                        </div>
                    </Col>

                    <Col xs={24} className="flex justify-center lg:justify-end mt-4">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-[180px]"
                            loading={changePasswordLoading}
                            disabled={changePasswordLoading}
                        >
                            تحديث
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
