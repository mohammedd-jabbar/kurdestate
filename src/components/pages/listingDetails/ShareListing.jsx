import { useState } from "react";
import { BiSolidShareAlt } from "react-icons/bi";
import { BsFacebook, BsLinkedin } from "react-icons/bs";

import {
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  LinkedinShareButton,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";

const ShareListing = () => {
  const [isShareLink, setIsShareLink] = useState(false);
  return (
    <>
      <div className="relative">
        <button
          className="relative flex z-10 bg-white border rounded-md p-2 opacity-50 hover:opacity-100 focus:outline-none focus:border-border"
          title="click to enable menu"
          onClick={() => setIsShareLink(!isShareLink)}
        >
          <BiSolidShareAlt />
        </button>
        <div
          className={`absolute right-0 mt-0 w-48 bg-white rounded-sm overflow-hidden shadow-lg z-20 border border-gray-100 ${
            isShareLink ? "block" : "hidden"
          }`}
        >
          <a
            href="#"
            title="Share on Facebook"
            className="flex px-4 py-2 group text-sm text-gray-800 border-b hover:bg-white"
          >
            <BsFacebook className="h-5 w-5 group-hover:text-black text-primary-500" />
          </a>
          <a
            href="#"
            title="Share on Twitter"
            className="flex px-4 py-2 group text-sm text-gray-800 border-b hover:bg-white"
          ></a>

          <a
            href="#"
            title="Share on LinkedIn"
            className="flex group px-4 py-2 text-sm text-gray-800 border-b hover:bg-white"
          >
            <BsLinkedin className="h-5 w-5 group-hover:text-black text-primary-500" />
          </a>
          <span className="text-gray-600">LinkedIn</span>
        </div>
      </div>
    </>
  );
};

export default ShareListing;

// {/* <TwitterIcon
//   title={`Just found a fantastic real estate listing from kurd estate webiste!\n\n`}
//   via={`Mohammedjabbar0\n`}
//   hashtags={["Realestate", "saleHouse\n"]}
//   url={`mohammedd.com${location.pathname}\n\n`}
// >
//   <TwitterIcon />
// </TwitterIcon>
// <FacebookShareButton
//   quote={"Just found a fantastic real estate listing!"}
//   hashtag={"#saleHouse"}
// >
//   <FacebookIcon />
// </FacebookShareButton>
// <LinkedinShareButton
//   source={`mohammedd.com${location.pathname}\n\n`}
//   url={`mohammedd.com${location.pathname}\n\n`}
// >
//   <LinkedinIcon />
// </LinkedinShareButton>
// <EmailShareButton
//   subject={"Kurd Estate"}
//   body={`Just found a fantastic real estate listing from kurd estate website!\n\n`}
//   separator={`mohammedd.com${location.pathname}\n\n`}
// >
//   <EmailIcon />
// </EmailShareButton> */}
// {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">
//   Twitter
// </button> */}
