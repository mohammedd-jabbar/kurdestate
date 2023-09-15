import { useContext } from "react";
import { ExpandedContext } from "../../../store/SidebarProvider";

const SettingsContent = () => {
  const { expanded } = useContext(ExpandedContext);
  return (
    <div
      className={`max-w-6xl max-md:max-w-[95%] mx-auto max-md:text-center transition-all duration-200 ease-in-out mt-7  ${
        expanded ? "md:ml-[13.5rem]" : "md:ml-[5.3rem]"
      }`}
    >
      <div>
        <h1 className="text-2xl font-bold pb-4 border-b border-border">
          General Information
        </h1>
      </div>
    </div>
  );
};

export default SettingsContent;
