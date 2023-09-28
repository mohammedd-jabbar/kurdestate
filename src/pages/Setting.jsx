import { useContext, useState } from "react";
import Sidebar, { SidebarItem } from "../components/pages/settings/Sidebar";
// import DashboardContent from "../components/pages/settings/DashboardContent"; // Import your content components
// import ProfileContent from "../components/pages/settings/ProfileContent";
import PostsContent from "../components/pages/settings/PostsContent";
import SettingsContent from "../components/pages/settings/SettingsContent";
// import HelpContent from "../components/pages/settings/HelpContent";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaListAlt, FaUserCog, FaCog } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import Dashboard from "../components/pages/settings/Dashboard";
import ProfileContent from "../components/pages/settings/ProfileContent";
import { UserInfoContext } from "../store/UserInfoProvider";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { notifications } from "../components/common/Notifications";
import Fav from "../components/pages/settings/Fav";
import { MdFavoriteBorder } from "react-icons/md";

const Setting = () => {
  const [activeItem, setActiveItem] = useState("posts"); // Default active item

  const { data } = useContext(UserInfoContext);
  const auth = getAuth();
  const navigateTo = useNavigate();

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
        return <PostsContent />;
      case "settings":
        return <SettingsContent />;
      case "favorites":
        return <Fav />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // when user logout redirect user to the homepage

    try {
      if (window.confirm("Are you sure you want to logout?")) {
        auth.signOut(auth); // Sign out the current user and update the state
        navigateTo("/");
        window.location.reload();
      }
    } catch (error) {
      notifications("You can't logout", true);
    }
  };

  return (
    <>
      <main className="fixed z-20 flex min-h-screen">
        <Sidebar>
          {data.uid === "WoRWTrX3FfZSp2bt7Rhf9hqLDE63" && (
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
          )}
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
          <div
            onClick={() => handleSidebarItemClick("favorites")}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem
              active={activeItem === "favorites"}
              icon={<MdFavoriteBorder size={20} />}
              text="Favorites"
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
            onClick={() => handleLogout()}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem icon={<RxExit size={20} />} text="SignOut" />
          </div>
        </Sidebar>
      </main>
      {/* Render the appropriate content */}
      <div className="">{renderContent()}</div>
    </>
  );
};

export default Setting;
