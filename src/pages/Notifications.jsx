import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "../redux/userSlice";

export default function Notifications() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const markAllasSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/user/mark-all-notifications-as-seen",
        { userId: user._id }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  const deletAllNotification = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/user/delete-all-notifications",
        { userId: user._id }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="unseen" key={0}>
          <div className="d-flex justify-content-end">
            <p
              style={{ cursor: "pointer" }}
              className="anchor"
              onClick={() => {
                markAllasSeen();
                window.location.reload();
              }}
            >
              Mark all as seen
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {user?.unseenNotificatons.map((notification) => (
              <div
                style={{ cursor: "pointer" }}
                className="card p-2 my-3"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="d-flex justify-content-end">
            <p
              style={{ cursor: "pointer" }}
              className="anchor"
              onClick={() => {
                deletAllNotification();
                window.location.reload();
              }}
            >
              Delet all
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {user?.seenNotificatons.map((notification) => (
              <div
                style={{ cursor: "pointer" }}
                className="card p-2 my-3"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}
