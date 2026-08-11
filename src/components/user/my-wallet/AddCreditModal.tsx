"use client";

import { useState } from "react";
import { Modal, Button, Input, Form, Select } from "antd";
import { RiShieldCheckLine } from "react-icons/ri";
import { useTranslations } from "next-intl";
import { useAddBalance } from "@/hooks/auth/useAddBalance";
import useGetCurrencies, {
  type Currency,
} from "@/app/[locale]/_hooks/useGetCurrencies";

const QUICK_AMOUNTS = [50, 100, 200, 300, 400, 500];

const DEFAULT_CURRENCY = "EGP";

/** Egyptian pounds unless the account has no such currency to charge in. */
const defaultCurrencyOf = (currencies: Currency[]) =>
  currencies.some((c) => c.code === DEFAULT_CURRENCY)
    ? DEFAULT_CURRENCY
    : (currencies[0]?.code ?? DEFAULT_CURRENCY);

interface AddCreditModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddCreditModal = ({ open, onClose }: AddCreditModalProps) => {
  const t = useTranslations("wallet.addCredit");
  const [form] = Form.useForm();
  const [activeQuick, setActiveQuick] = useState<number | null>(100);
  const { addBalanceMutation, addBalanceLoading } = useAddBalance();
  const { data: currencies = [], isLoading: currenciesLoading } =
    useGetCurrencies();
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  const handleQuickPick = (val: number) => {
    setActiveQuick(val);
    form.setFieldValue("amount", val.toFixed(2));
  };

  const handleAmountChange = () => {
    setActiveQuick(null);
  };

  const handleClose = () => {
    form.setFieldValue("amount", "100.00");
    setActiveQuick(100);
    onClose();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await addBalanceMutation({ amount: Number(values.amount), currency });
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      className="add-credit-modal"
      title={<p className="text-black text-start">{t("title")}</p>}
      afterOpenChange={(visible) => {
        if (visible) {
          form.setFieldValue("amount", "100.00");
          setActiveQuick(100);
          setCurrency(defaultCurrencyOf(currencies));
        }
      }}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        {/* Amount input */}
        <div className="inputS1 mb-4">
          <Form.Item
            label={t("amountLabel")}
            name="amount"
            rules={[{ required: true, message: t("amountRequired") }]}
          >
            <Input
              suffix={<span className="text-gray-400 text-sm">{currency}</span>}
              type="number"
              min={0}
              onChange={handleAmountChange}
              placeholder="0.00"
            />
          </Form.Item>
        </div>

        {/* Currency */}
        <div className="inputS1 mb-8">
          <Form.Item label={t("currencyLabel")}>
            <Select
              value={currency}
              onChange={setCurrency}
              loading={currenciesLoading}
              options={currencies.map((c) => ({
                value: c.code,
                label: `${c.code} — ${c.name}`,
              }))}
            />
          </Form.Item>
        </div>

        {/* Quick pick */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {QUICK_AMOUNTS.map((val) => (
            <button
              type="button"
              key={val}
              onClick={() => handleQuickPick(val)}
              className={`flex-1 min-w-[60px] py-2 px-3 rounded-xl text-sm font-semibold border transition-colors ${
                activeQuick === val
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {t("quickAmount", { amount: val, currency })}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button
          type="primary"
          block
          loading={addBalanceLoading}
          onClick={handleSubmit}
        >
          {t("continueToPayment")}
        </Button>
      </Form>

      {/* Security note */}
      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-50 border border-green-100 px-4 py-3">
        <RiShieldCheckLine className="text-green-500 text-lg shrink-0" />
        <p className="text-xs text-green-700 text-center">
          {t("securityNote")}
        </p>
      </div>
    </Modal>
  );
};
