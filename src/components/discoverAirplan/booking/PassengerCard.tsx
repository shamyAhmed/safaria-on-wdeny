"use client";
import { Ref } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { FaChevronDown, FaMinus, FaUserCheck } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useDatePickerFormat } from "@/hooks/useFormatDate";
import { PassengerState, PassengerType } from "./types";
import { GENDER_OPTIONS, TITLE_OPTIONS, TITLE_TO_GENDER } from "./options";
import { CountrySelectInput } from "@/components/common/CountrySelectInput";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;

// ─── Per-passenger form fields ────────────────────────────────────────────────

const getDobDisabledDate = (type: PassengerType) => (d: Dayjs) => {
    const today = dayjs();
    if (type === "adult")  return d.isAfter(today.subtract(12, "year"));
    if (type === "child")  return d.isAfter(today.subtract(2, "year")) || d.isBefore(today.subtract(12, "year").subtract(1, "day"));
    /* infant */           return d.isAfter(today) || d.isBefore(today.subtract(2, "year"));
};

const getDobDefaultPickerValue = (type: PassengerType): Dayjs => {
    if (type === "adult")  return dayjs().subtract(12, "year");
    if (type === "child")  return dayjs().subtract(2, "year");
    /* infant */           return dayjs();
};

const PassengerFields = ({
    id,
    type,
    disabled,
    showMembership,
    onToggleMembership,
}: {
    id: number;
    type: PassengerType;
    disabled: boolean;
    showMembership: boolean;
    onToggleMembership: () => void;
}) => {
    const prefix = `p_${id}`;
    const form = Form.useFormInstance();
    const gender: string | undefined = Form.useWatch(`${prefix}_gender`, form);
    const t = useTranslations("passengerForm");
    const dateFormat = useDatePickerFormat();

    const allTitles = TITLE_OPTIONS.map((o) => ({
        ...o,
        label: t(`titleOptions.${o.value}`),
    }));

    const allGenders = GENDER_OPTIONS.map((o) => ({
        ...o,
        label: t(`genderOptions.${o.value}`),
    }));

    const filteredTitles = gender
        ? allTitles.filter((o) => o.gender === gender)
        : allTitles;

    const handleGenderChange = (value: string) => {
        const currentTitle: string | undefined = form.getFieldValue(`${prefix}_title`);
        if (currentTitle && TITLE_TO_GENDER[currentTitle] !== value) {
            form.setFieldValue(`${prefix}_title`, undefined);
        }
    };

    const handleTitleChange = (value: string) => {
        form.setFieldValue(`${prefix}_gender`, TITLE_TO_GENDER[value]);
    };

    return (
        <div className={`pt-5 pb-1 ${disabled ? "opacity-60 pointer-events-none select-none" : ""}`}>

            {/* ── Personal info ── */}
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={8} md={4}>
                    <div className="selectS1 with-border">
                        <Form.Item label={t("title.label")} name={`${prefix}_title`} rules={[{ required: true, message: t("title.required") }]}>
                            <Select placeholder={t("title.placeholder")} disabled={disabled} onChange={handleTitleChange}>
                                {filteredTitles.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={8} md={5}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("firstName.label")}
                            name={`${prefix}_firstName`}
                            rules={[
                                { required: true, message: t("firstName.required") },
                                { pattern: /^[a-zA-Z\s]+$/, message: t("firstName.englishOnly") },
                            ]}
                        >
                            <Input placeholder={t("firstName.placeholder")} disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={8} md={5}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("middleName.label")}
                            name={`${prefix}_middleName`}
                            rules={[
                                { pattern: /^[a-zA-Z\s]*$/, message: t("middleName.englishOnly") },
                            ]}
                        >
                            <Input placeholder={t("middleName.placeholder")} disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={8} md={5}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("lastName.label")}
                            name={`${prefix}_lastName`}
                            rules={[
                                { required: true, message: t("lastName.required") },
                                { pattern: /^[a-zA-Z\s]+$/, message: t("lastName.englishOnly") },
                            ]}
                        >
                            <Input placeholder={t("lastName.placeholder")} disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={8} md={5}>
                    <div className="selectS1 with-border">
                        <Form.Item
                            label={t("gender.label")}
                            name={`${prefix}_gender`}
                            rules={[{ required: true, message: t("gender.required") }]}
                        >
                            <Select placeholder={t("gender.placeholder")} disabled={disabled} onChange={handleGenderChange}>
                                {allGenders.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("dob.label")}
                            name={`${prefix}_dob`}
                            rules={[{ required: true, message: t("dob.required") }]}
                        >
                            <DatePicker
                                className="w-full"
                                placeholder={t("dob.placeholder")}
                                format={dateFormat}
                                disabled={disabled}
                                disabledDate={getDobDisabledDate(type)}
                                defaultPickerValue={getDobDefaultPickerValue(type)}
                            />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                <div className="selectS1 with-border">
                    <CountrySelectInput
                        name={`${prefix}_nationality`}
                        label={t("nationality.label")}
                        placeholder={t("nationality.placeholder")}
                        disabled={disabled}
                        rules={[{ required: true, message: t("nationality.required") }]}
                    />

                </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                <div className="selectS1 with-border">
                    <CountrySelectInput
                        name={`${prefix}_residenceCountry`}
                        label={t("residenceCountry.label")}
                        placeholder={t("residenceCountry.placeholder")}
                        disabled={disabled}
                        rules={[{ required: true, message: t("residenceCountry.required") }]}
                    />

                </div>
                </Col>
            </Row>

            {/* ── Document info ── */}
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={12} md={8}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("passportNumber.label")}
                            name={`${prefix}_passportNumber`}
                            rules={[{ required: true, message: t("passportNumber.required") }]}
                        >
                            <Input placeholder={t("passportNumber.placeholder")} disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                <div className="selectS1 with-border">
                    <CountrySelectInput
                        name={`${prefix}_passportCountry`}
                        label={t("passportCountry.label")}
                        placeholder={t("passportCountry.placeholder")}
                        disabled={disabled}
                        rules={[{ required: true, message: t("passportCountry.required") }]}
                    />

                </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("passportExpiry.label")}
                            name={`${prefix}_passportExpiry`}
                            rules={[{ required: true, message: t("passportExpiry.required") }]}
                        >
                            <DatePicker
                                className="w-full"
                                placeholder={t("passportExpiry.placeholder")}
                                format={dateFormat}
                                disabled={disabled}
                                disabledDate={(d) => d && d.isBefore(new Date())}
                            />
                        </Form.Item>
                    </div>
                </Col>
            </Row>

            {/* ── Address info ── */}
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={12}>
                <div className="selectS1 with-border">
                    <CountrySelectInput
                        name={`${prefix}_addressCountry`}
                        label={t("addressCountry.label")}
                        placeholder={t("addressCountry.placeholder")}
                        disabled={disabled}
                        rules={[{ required: true, message: t("addressCountry.required") }]}
                    />

                </div>
                </Col>

                <Col xs={24} sm={12}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("addressCity.label")}
                            name={`${prefix}_addressCity`}
                            rules={[
                                { required: true, message: t("addressCity.required") },
                                { pattern: /^[a-zA-Z\s]+$/, message: t("addressCity.englishOnly") },
                            ]}
                        >
                            <Input placeholder={t("addressCity.placeholder")} disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("addressLine1.label")}
                            name={`${prefix}_addressLine1`}
                            rules={[
                                { required: true, message: t("addressLine1.required") },
                                { pattern: /^[a-zA-Z0-9\s]+$/, message: t("addressLine1.englishOnly") },
                            ]}
                        >
                            <Input placeholder={t("addressLine1.placeholder")} disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>

                <Col xs={24}>
                    <div className="inputS1 with-border">
                        <Form.Item
                            label={t("addressLine2.label")}
                            name={`${prefix}_addressLine2`}
                            rules={[
                                { pattern: /^[a-zA-Z0-9\s]*$/, message: t("addressLine2.englishOnly") },
                            ]}
                        >
                            <Input placeholder={t("addressLine2.placeholder")} disabled={disabled} />
                        </Form.Item>
                    </div>
                </Col>
            </Row>

            {/* ! Frequent flyer membership — NOT CURRENTLY SUPPORTED */}
            {/* {!disabled && (
                <div className="mt-4 rounded-xl overflow-hidden">
                    <button
                        type="button"
                        onClick={onToggleMembership}
                        className="w-full flex items-center gap-2 px-4 py-3 transition-colors text-right"
                    >
                        <span className="text-primary font-bold text-sm">
                            {showMembership ? <FaMinus className="inline me-1" /> : <FiPlus size={14} className="inline me-1" />}
                            اضافة رقم عضوية الطيران (اختياري)
                        </span>
                    </button>

                    <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{ maxHeight: showMembership ? "200px" : "0px" }}
                    >
                        <div className="px-4 py-4 bg-[#f0f7ff]">
                            <Row gutter={[12, 0]}>
                                <Col xs={24} sm={8}>
                                    <div className="inputS1 with-border">
                                        <Form.Item label="شركة الطيران" initialValue={"Saudi Airline"} name={`${prefix}_airlineName`}>
                                            <Input readOnly value={"Saudi Airline"} className="!bg-white !cursor-default" />
                                        </Form.Item>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div className="inputS1 with-border">
                                        <Form.Item label="الرمز" name={`${prefix}_airlineCode`} initialValue={"XY"}>
                                            <Input readOnly className="!bg-white !cursor-default" />
                                        </Form.Item>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div className="inputS1 with-border">
                                        <Form.Item label="رقم عضوية المسافر الدائم" name={`${prefix}_membershipNumber`}>
                                            <Input placeholder="رقم عضوية المسافر الدائم" />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

// ─── Passenger accordion card ─────────────────────────────────────────────────

export const PassengerCard = ({
    passenger,
    form,
    showMembership,
    onToggle,
    onConfirm,
    onEdit,
    onToggleMembership,
    cardRef,
}: {
    passenger: PassengerState;
    form: ReturnType<typeof Form.useForm>[0];
    showMembership: boolean;
    onToggle: () => void;
    onConfirm: (name: string) => void;
    onEdit: () => void;
    onToggleMembership: () => void;
    cardRef?: Ref<HTMLDivElement>;
}) => {
    const t = useTranslations("bookingPage.passengerTypes");
    const tForm = useTranslations("passengerForm");
    const { id, displayNum, type, isExpanded, savedName } = passenger;
    const isSaved = savedName !== null;

    const requiredFields = [
        `p_${id}_title`,
        `p_${id}_firstName`,
        `p_${id}_lastName`,
        `p_${id}_gender`,
        `p_${id}_dob`,
        `p_${id}_nationality`,
        `p_${id}_residenceCountry`,
        `p_${id}_passportNumber`,
        `p_${id}_passportCountry`,
        `p_${id}_passportExpiry`,
        `p_${id}_addressCountry`,
        `p_${id}_addressCity`,
        `p_${id}_addressLine1`,
    ];

    const handleConfirm = () => {
        form.validateFields(requiredFields).then(() => {
            const first = (form.getFieldValue(`p_${id}_firstName`) as string) || "";
            const last = (form.getFieldValue(`p_${id}_lastName`) as string) || "";
            onConfirm(`${first} ${last}`.trim() || tForm("passengerLabel", { num: displayNum }));
        });
    };

    return (
        <div
            ref={cardRef}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 mb-4
            ${isSaved ? "border-green-200" : "border-primary/30"}`}
        >
            {/* Header */}
            <button
                type="button"
                onClick={onToggle}
                className={`w-full flex items-center gap-3 px-5 py-4 text-right transition-colors
                    ${isExpanded
                        ? "bg-primary/5 border-b border-primary/15"
                        : isSaved ? "bg-[#F6FFF6] hover:bg-[#eefaee]" : "bg-[#F5F5F7] hover:bg-gray-100"
                    }`}
            >
                <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm
                    ${isSaved ? "bg-green-500 text-white" : "bg-primary text-white"}`}>
                    {isSaved ? <FaUserCheck size={15} /> : displayNum}
                </div>

                <div className="flex-1 text-right min-w-0">
                    <p className="font-bold text-[#333] text-sm leading-tight">
                        {tForm("passengerLabel", { num: displayNum })}
                        <span className="font-normal text-gray-400 ms-2">({t(type)})</span>
                    </p>
                    {isSaved && !isExpanded && (
                        <p className="text-xs text-green-600 mt-0.5 font-medium truncate">{savedName}</p>
                    )}
                    {!isSaved && !isExpanded && (
                        <p className="text-xs text-gray-400 mt-0.5">{tForm("noDataEntered")}</p>
                    )}
                </div>

                <FaChevronDown
                    size={13}
                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
            </button>

            {/* Body */}
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isExpanded ? "2400px" : "0px" }}
            >
                <div className="px-5 pb-5">
                    <PassengerFields
                        id={id}
                        type={type}
                        disabled={isSaved}
                        showMembership={showMembership}
                        onToggleMembership={onToggleMembership}
                    />
                    <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                        {isSaved ? (
                            <Button
                                onClick={onEdit}
                                className="!h-10 !px-10 !rounded-full !font-bold !border-primary !text-primary hover:!bg-primary hover:!text-white"
                            >
                                {tForm("editData")}
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                onClick={handleConfirm}
                                className="!h-10 !px-10 !rounded-full !font-bold"
                            >
                                {tForm("confirmPassenger")}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
