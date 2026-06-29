"use client";

export const BaggageDetailsTab = ({ flight }: { flight: any }) => {
    const baggageLines = [
        "الخطوط الجوية السعودية - SV-0386 -بالغ PC1 (تسجيل الحقائب) بالغ PC 0 (أمتعة اليد)",
        "الخطوط الجوية السعودية - SV-0386 -بالغ PC1 (تسجيل الحقائب) بالغ PC 0 (أمتعة اليد)",
        "الخطوط الجوية السعودية - SV-0386 -بالغ PC1 (تسجيل الحقائب) بالغ PC 0 (أمتعة اليد)",
        "الخطوط الجوية السعودية - SV-0386 -بالغ PC1 (تسجيل الحقائب) بالغ PC 0 (أمتعة اليد)",
        "الخطوط الجوية السعودية - SV-0386 -بالغ PC1 (تسجيل الحقائب) بالغ PC 0 (أمتعة اليد)",
        "الخطوط الجوية السعودية - SV-0386 -بالغ PC1 (تسجيل الحقائب) بالغ PC 0 (أمتعة اليد)",
    ];

    return (
        <div className="baggage-details p-6">
            <div className="flex flex-col gap-6">
                {baggageLines.map((line, idx) => (
                    <div key={idx} className="text-right text-sm font-bold text-[#333]">
                        {line}
                    </div>
                ))}
            </div>
        </div>
    );
};
