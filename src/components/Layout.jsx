import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-7-line" },
    { name: "Services", path: "/services", icon: "ri-hand-heart-line" },
    { name: "community chat", path: "/chat", icon: "ri-message-3-line" },
    { name: "Appointments", path: "/appointment", icon: "ri-booklet-line" },
    { name: "Video Session", path: "/video", icon: "ri-video-chat-line" },
    { name: "Apply Doctor", path: "/apply-doctor", icon: "ri-nurse-fill" },
  ];

  const adminMenu = [
    { name: "Home", path: "/", icon: "ri-home-7-line" },
    { name: "Services", path: "/services", icon: "ri-hand-heart-line" },
    { name: "Users", path: "/admin/Users", icon: "ri-folder-user-line" },
    { name: "community chat", path: "/chat", icon: "ri-message-3-line" },
    { name: "Doctors", path: "/admin/doctors", icon: "ri-award-line" },
  ];

  const doctorMenu = [
    { name: "Home", path: "/", icon: "ri-home-7-line" },
    { name: "community chat", path: "/chat", icon: "ri-message-3-line" },
    { name: "Services", path: "/services", icon: "ri-hand-heart-line" },
    {
      name: "Appointments",
      path: "/doctor/appointment",
      icon: "ri-booklet-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
    { name: "Video Session", path: "/video", icon: "ri-video-chat-line" },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const roll = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    <div className="main">
      <div className="d-flex layout">
        <motion.div
          className="sidebar"
          initial={{ width: "250px" }}
          animate={{ width: collapsed ? "80px" : "250px" }}
          transition={{ duration: 0.3 }}
        >
          <div className="sidebar-header">
            <i className="ri-service-fill head-icon"></i>
            <p className="roll">{roll}</p>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <motion.div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <i
                    onClick={() => navigate(menu.path)}
                    className={menu.icon}
                  ></i>
                  {!collapsed && (
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(menu.path)}
                    >
                      {menu.name}
                    </p>
                  )}
                </motion.div>
              );
            })}
            <div
              className="d-flex menu-item"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <i className="ri-logout-box-r-line"></i>
              {!collapsed && (
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Logout
                </p>
              )}
            </div>
          </div>
          <button
            className="toggle-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? ">>>" : "<<<"}
          </button>
        </motion.div>
        <div className="content">
          <div className="header">
            <div className="d-flex align-items-center px-4">
              <Badge
                size="small"
                count={user?.unseenNotificatons.length}
                onClick={() => navigate("/notification")}
              >
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <i className="ri-notification-4-line act-icon px-2"></i>
                </motion.div>
              </Badge>
              <Link
                style={{ color: "black", fontWeight: "bolder" }}
                className="anchor mx-3"
              >
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}
