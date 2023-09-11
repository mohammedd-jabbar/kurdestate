import { useState } from "react";
import Sidebar, { SidebarItem } from "../components/pages/settings/Sidebar";
// import DashboardContent from "../components/pages/settings/DashboardContent"; // Import your content components
// import ProfileContent from "../components/pages/settings/ProfileContent";
// import PostsContent from "../components/pages/settings/PostsContent";
// import SettingsContent from "../components/pages/settings/SettingsContent";
// import HelpContent from "../components/pages/settings/HelpContent";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaListAlt, FaUserCog, FaCog } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import Dashboard from "../components/pages/settings/Dashboard";
import ProfileContent from "../components/pages/settings/ProfileContent";

const Setting = () => {
  const [activeItem, setActiveItem] = useState("profile"); // Default active item

  // Function to set the active item when clicking on a sidebar item
  const handleSidebarItemClick = (item) => {
    setActiveItem(item);
  };

  // Helper function to render the appropriate content based on activeItem
  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <ProfileContent />;
      case "posts":
        return "<PostsContent />";
      case "settings":
        return "<SettingsContent />";
      case "help":
        return "<HelpContent />";
      default:
        return null;
    }
  };

  return (
    <>
      <main className="fixed z-20 flex min-h-screen">
        <Sidebar>
          <div
            onClick={() => handleSidebarItemClick("dashboard")}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem
              active={activeItem === "dashboard"}
              icon={<LuLayoutDashboard size={20} />}
              text="Dashboard"
            />
          </div>
          <div
            onClick={() => handleSidebarItemClick("profile")}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem
              active={activeItem === "profile"}
              icon={<FaUserCog size={20} />}
              text="Profile"
            />
          </div>

          <div
            onClick={() => handleSidebarItemClick("posts")}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem
              active={activeItem === "posts"}
              icon={<FaListAlt size={20} />}
              text="Posts"
            />
          </div>

          <hr className="my-3" />
          <div
            onClick={() => handleSidebarItemClick("settings")}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem
              active={activeItem === "settings"}
              icon={<FaCog size={20} />}
              text="Settings"
            />
          </div>
          <div
            onClick={() => handleSidebarItemClick("help")}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem
              active={activeItem === "help"}
              icon={<BiHelpCircle size={20} />}
              text="Help"
            />
          </div>
        </Sidebar>
      </main>
      {/* Render the appropriate content */}
      <div className="">{renderContent()}</div>
    </>
  );
};

export default Setting;
