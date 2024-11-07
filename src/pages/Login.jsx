import React from "react";
import "./pages.css";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { motion } from "framer-motion";

export default function Login() {
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const handleLogin = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/user/login",
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigat("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form Card p-4">
        <h1 className="card-title mb-4">Wellcome back!</h1>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input placeholder="password" type="password" />
          </Form.Item>
          <motion.div
            className="box"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              style={{ marginLeft: "17px", width: "90%", marginBottom: "20px" }}
              htmlType="submit"
              className="primary-button mt-2"
            >
              Log in
            </Button>
          </motion.div>
          <Link className="link" to="/sign-up">
            Don't have an accout signup here
          </Link>
        </Form>
      </div>
    </div>
  );
}
