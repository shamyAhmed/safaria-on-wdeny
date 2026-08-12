"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useGetSettings } from "@/hooks/useGetSettings";
import { AppPromoBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";
import { CmsImage } from "@/components/common/CmsImage";

const GetAppSection = ({ data }: { data: AppPromoBlockData }) => {
    const t = useTranslations("homePage.getApp");
    const locale = useLocale();
    // The store links live on the block, but fall back to the global settings
    // so the buttons still work if the CMS leaves them blank.
    const { settings } = useGetSettings();

    const googleStoreUrl =
        data.google_store_url?.trim() || settings?.app_link_on_google_store || "#";
    const appleStoreUrl =
        data.apple_store_url?.trim() || settings?.app_link_on_apple_store || "#";

    return (
        <div className="container py-10 md:py-14 lg:py-20">
            <div
                dir="rtl"
                className="relative overflow-hidden rounded-[28px] bg-primary px-5 pt-10 sm:px-8 sm:pt-12 md:rounded-[40px] md:px-10 lg:flex lg:items-center lg:gap-8 lg:rounded-[50px] lg:px-12 lg:pt-0"
            >
                <div className="relative space-y-5 pb-8 text-center text-white lg:w-1/2 lg:py-16 lg:text-right xl:py-24">
                    <p className="text-sm font-semibold sm:text-base md:text-lg">
                        {pickText(data.description, locale)}
                    </p>
                    <p className="mx-auto max-w-[18ch] text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:mx-0">
                        {pickText(data.title, locale)}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                        <a
                            href={googleStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-md border border-white/80 bg-transparent px-4 py-2.5 text-xs font-semibold sm:px-5 sm:text-sm"
                        >
                            <p>{t("googlePlay")}</p>
                            <Image
                                src="/images/home-app/google-play.png"
                                alt="google-play"
                                height={12}
                                width={22}
                            />
                        </a>

                        <a
                            href={appleStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-md border border-white/80 bg-transparent px-4 py-2.5 text-xs font-semibold sm:px-5 sm:text-sm"
                        >
                            <p>{t("appleStore")}</p>
                            <Image
                                src="/images/home-app/apple-icon.png"
                                alt="apple"
                                height={12}
                                width={22}
                            />
                        </a>
                    </div>
                </div>

                <div className="relative h-[230px] sm:h-[290px] md:h-[340px] lg:h-[420px] lg:w-1/2">
                    <div className="absolute left-1/2 top-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/10 sm:h-[390px] sm:w-[390px] md:h-[480px] md:w-[480px] lg:top-8 lg:h-[560px] lg:w-[560px]" />
                    <div className="absolute left-1/2 top-24 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-white/10 sm:h-[330px] sm:w-[330px] md:h-[400px] md:w-[400px] lg:top-20 lg:h-[470px] lg:w-[470px]" />

                    <CmsImage
                        src={data.media}
                        alt={pickText(data.title, locale)}
                        height={850}
                        width={800}
                        className="absolute bottom-0 left-1/2 z-10 h-auto  -translate-x-1/2 sm:w-[380px] md:w-[530px] lg:h-[90%] lg:w-auto"
                        // A grey placeholder would read as broken on the blue
                        // panel; tint it to sit in the same palette.
                        placeholderClassName="absolute bottom-0 left-1/2 z-10 h-[85%] w-[70%] -translate-x-1/2 rounded-t-[28px] !bg-white/15 !text-white/80"
                        placeholderIconClassName="text-5xl"
                        showPlaceholderLabel={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default GetAppSection;
