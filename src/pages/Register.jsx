import React from "react";
import "./pages.css";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { motion } from "framer-motion";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSave = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/user/signup",
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
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
        <h1 className="card-title mb-4">it's nice to have you here</h1>
        <Form layout="vertical" onFinish={handleSave}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input placeholder="password" type="password" />
          </Form.Item>
          <div className="password-reqirment">
            <b>paswer must have atlest:</b>
            <ul>
              <li>Atleast one uppercase</li>
              <li>Atleast one number</li>
              <li>Atleast one special character</li>
            </ul>
          </div>
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
              Sign up
            </Button>
          </motion.div>
          <Link className="link" to="/login">
            Have an account login here{" "}
          </Link>
        </Form>
      </div>
    </div>
  );
}
