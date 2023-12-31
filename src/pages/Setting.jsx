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
import DeleteModal from "../components/common/DeleteModal";
import { useTranslation } from "react-i18next";

const Setting = () => {
  const [activeItem, setActiveItem] = useState("posts"); // Default active item
  const { t, i18n } = useTranslation("settings");

  const { data } = useContext(UserInfoContext);
  const auth = getAuth();
  const navigateTo = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // State to handle open module

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
      auth.signOut(auth); // Sign out the current user and update the state
      navigateTo("/");
    } catch (error) {
      notifications("You can't logout", true);
    }
  };

  return (
    <>
      <main
        className={`fixed z-20 flex min-h-screen ${
          i18n.language === "ku" && "right-0"
        }`}
        dir={i18n.language === "ku" ? "rtl" : "ltr"}
      >
        <DeleteModal
          open={isOpen}
          childern={
            <>
              <div className="mx-auto my-4 w-72 max-sm:w-38 z-50">
                <h3 className="text-lg font-black text-gray-800 dark:text-slate-200">
                  {t("Confirm Logout")}
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 pt-2">
                  {t("Are you sure you want to delete this listing?")}
                </p>
              </div>
              <div className="flex mt-8 gap-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full font-inter bg-white dark:bg-slate-700 border dark:border-darkBackground border-border text-black dark:text-white rounded-md py-1.5 px-3 "
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={() => handleLogout()}
                  className="w-full font-inter bg-red-600 text-white rounded-md py-1.5 px-3 hover:bg-red-700 active:bg-red-800 transition-all duration-150 ease-in-out"
                >
                  {t("Logout")}
                </button>
              </div>
            </>
          }
          onClose={() => setIsOpen(false)}
        />
        <Sidebar>
          {data.uid === "TvddowUjyETNVQbDiwhoFekvj0J3" && (
            <div
              onClick={() => handleSidebarItemClick("dashboard")}
              style={{ background: "none", color: "inherit" }}
            >
              <SidebarItem
                active={activeItem === "dashboard"}
                icon={<LuLayoutDashboard size={20} />}
                text={t("Dashboard")}
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
              text={t("Profile")}
            />
          </div>

          <div
            onClick={() => handleSidebarItemClick("posts")}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem
              active={activeItem === "posts"}
              icon={<FaListAlt size={20} />}
              text={t("Posts")}
            />
          </div>
          <div
            onClick={() => handleSidebarItemClick("favorites")}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem
              active={activeItem === "favorites"}
              icon={<MdFavoriteBorder size={20} />}
              text={t("Favorites")}
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
              text={t("Settings")}
            />
          </div>
          <div
            onClick={() => setIsOpen(true)}
            style={{ background: "none", color: "inherit" }}
          >
            <SidebarItem icon={<RxExit size={20} />} text={t("SignOut")} />
          </div>
        </Sidebar>
      </main>
      {/* Render the appropriate content */}
      <div className="max-w-6xl mx-auto dark:bg-darkBackgroundDarker dark:text-white">
        {renderContent()}
      </div>
    </>
  );
};

export default Setting;
