import { ReactNode } from "react";

interface BookingStepSectionProps {
    count: number;
    title: string;
    description?: ReactNode;
    extra?: ReactNode;
    children: ReactNode;
}

export const BookingStepSection = ({
    count,
    title,
    description,
    extra,
    children,
}: BookingStepSectionProps) => {
    return (
        <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center justify-between gap-3 px-6 py-4 bg-primary">
                <div className={`flex gap-3 ${description ? "items-start" : "items-center"}`}>
                    <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                        {count}
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-tight">{title}</h3>
                        {description && (
                            <div className="text-white/75 text-xs mt-0.5">{description}</div>
                        )}
                    </div>
                </div>
                {extra && <div className="shrink-0">{extra}</div>}
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
};
