import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import DoctorForm from "../../components/DoctorForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/doctor/get-doctor-info-by-user-id",
        { userId: params.userId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const onSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/doctor/update-doctor-profile",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
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
      <h1 className="page-title">Edit Doctor Profile</h1>
      <hr />
      {doctor && <DoctorForm onSubmit={onSubmit} initialValues={doctor} />}
    </Layout>
  );
}
