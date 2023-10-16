/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSolidShareAlt } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

import {
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
} from "react-share";

const ShareListing = ({ listing, id }) => {
  const { t, i18n } = useTranslation("listing");
  const [isShareLink, setIsShareLink] = useState(false);
  return (
    <>
      <div className="relative" dir={i18n.language === "ku" ? "rtl" : "ltr"}>
        <button
          className="relative flex z-10 bg-white border dark:bg-gray-700 dark:border-slate-700 rounded-md p-2 opacity-90 hover:opacity-100 focus:outline-none focus:border-border"
          onClick={() => setIsShareLink(!isShareLink)}
        >
          <BiSolidShareAlt className="dark:text-white" />
        </button>
        <div
          className={`absolute ltr:right-0 rtl:left-0 mt-0 w-48 bg-white dark:bg-darkBackground rounded-sm overflow-hidden shadow-lg z-20 border border-gray-100  ${
            isShareLink ? "block" : "hidden"
          }`}
        >
          <button className="flex px-4 w-full py-2 group text-sm text-gray-800 dark:text-white border-b dark:hover:bg-slate-700 hover:bg-white">
            <FacebookShareButton
              quote={"Just found a fantastic real estate listing!"}
              url={`mohammedd.com/category/${listing.type}/${id}`}
              hashtag={"#saleHouse"}
              className="flex space-x-2 rtl:space-x-reverse"
            >
              <FacebookIcon round={true} size={22} />
              <p className="text-xs text-extrabold">{t("Share to Facebook")}</p>
            </FacebookShareButton>
          </button>
          <button className="flex px-4 w-full py-2 group text-sm text-gray-800 dark:text-white border-b dark:hover:bg-slate-700 hover:bg-white">
            <TwitterShareButton
              title={`Just found a fantastic real estate property from kurd estate webiste!\n\n`}
              via={`Mohammedjabbar0\n`}
              hashtags={["Realestate", "saleHouse\n"]}
              url={`mohammedd.com/category/${listing.type}/${id}\n\n`}
              className="flex space-x-2 rtl:space-x-reverse"
            >
              <TwitterIcon round={true} size={22} />{" "}
              <p>{t("Share to Twitter")}</p>
            </TwitterShareButton>
          </button>

          <a
            rel="noreferrer"
            target="_blank"
            href={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&su=Kurd+Estate&body=Just+found+a+fantastic+real+estate+property+from+kurd+estate+website!%0A%0Amohammedd.com/category/${listing.type}/${id}%0A%0A`}
            className="flex space-x-2 w-full rtl:space-x-reverse px-4 py-2 group text-sm text-gray-800 dark:text-white border-b dark:hover:bg-slate-700 hover:bg-white"
          >
            <MdEmail className="w-[22px] h-[22px] text-red-500" />

            <p>{t("Send with Email")}</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default ShareListing;
