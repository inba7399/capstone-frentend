import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import { Row, Col, DatePicker, TimePicker } from "antd";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { v4 as uuidv4 } from "uuid";

export default function Appointments() {
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [doctor, setDoctor] = useState();
  const [isAvilable, setisAvilable] = useState(false);
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const price = doctor?.price;

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
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

  const handleBooking = async () => {
    setisAvilable(false);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
          room: uuidv4(),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("Booking request sent !");
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const handlePayment = () => {
    var options = {
      key: "",
      key_secret: "",
      amount: price * 100,
      currency: "INR",
      name: "CAPSTONE",
      description: "testing",
      handler: function (response) {
        console.log(response);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  const checkAvilability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/user/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        setisAvilable(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  return (
    <Layout>
      {doctor && (
        <h1 className="page-title mt-2">
          dr . {doctor.firstName} {doctor.lastName}
        </h1>
      )}
      <h4>
        Timings: {doctor?.timings[0]} ➩ {doctor?.timings[1]}
      </h4>
      <hr />
      <Row>
        <Col span={12} sm={24} xs={24} lg={8}>
          <div className="d-flex mt-4 flex-column">
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(value) => {
                setDate(value.format("DD-MM-YYYY"));
                setisAvilable(false);
              }}
            />
            <TimePicker
              format="HH:mm"
              onChange={(value) => {
                setTime(value.format("HH:mm"));
                setisAvilable(false);
              }}
              className="mt-3"
            />
            {!isAvilable && (
              <button
                onClick={checkAvilability}
                style={{ fontWeight: "500", color: "black" }}
                className="btn btn-outline-warning mt-3"
              >
                Check availability
              </button>
            )}

            {isAvilable && (
              <button
                onClick={handlePayment}
                style={{ fontWeight: "500", color: "black" }}
                className="btn btn-outline-info mt-3"
              >
                Pay now
              </button>
            )}
            {isAvilable && (
              <button
                onClick={handleBooking}
                style={{ fontWeight: "500", color: "black" }}
                className="btn btn-outline-success mt-3"
              >
                book Now
              </button>
            )}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
