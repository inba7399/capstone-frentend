import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";

export default function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/user/apply-doctor-account",
        { ...values, userId: user._id }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redarecting to Home page");
        navigate("/");
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
      <h1 className="page-title">Creat doctor profile</h1>
      <hr />
      <DoctorForm onSubmit={onSubmit} />
    </Layout>
  );
}
