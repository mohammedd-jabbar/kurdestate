import Sidebar, { SidebarItem } from "../components/pages/settings/Sidebar";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaListAlt, FaUserCog, FaCog } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";

const Setting = () => {
  return (
    <main className="flex min-h-screen">
      <Sidebar>
        <SidebarItem
          icon={<LuLayoutDashboard size={20} />}
          text="Dashboard"
          alert
        />
        <SidebarItem
          icon={<FaUserCog size={20} />}
          text="Profile Settings"
          active
        />
        <SidebarItem icon={<FaListAlt size={20} />} text="Posts" />

        <hr className="my-3" />
        <SidebarItem icon={<FaCog size={20} />} text="Settings" alert />
        <SidebarItem icon={<BiHelpCircle size={20} />} text="Help" />
      </Sidebar>
    </main>
  );
};

export default Setting;
