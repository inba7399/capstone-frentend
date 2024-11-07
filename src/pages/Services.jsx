import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorProfileCard from "../components/DoctorProfileCard";
import { Row, Col, Tabs } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

export default function Services() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://capstone-backend-afk6.onrender.com/api/user/get-all-approved-doctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const mhDoctors = doctors.filter(
    (doc) => doc.specialization === "Mental health"
  );
  const raDoctors = doctors.filter(
    (doc) => doc.specialization === "Relationship advice"
  );
  const ccDoctors = doctors.filter(
    (doc) => doc.specialization === "career counseling"
  );
  const saDoctors = doctors.filter(
    (doc) => doc.specialization === "Social anxiety"
  );

  return (
    <Layout>
      <Tabs>
        <Tabs.TabPane tab="Mental health" key={0}>
          <div className="card-grid">
            {mhDoctors.map((doctor, index) => {
              return (
                <div key={index} className="m-2">
                  <DoctorProfileCard doctor={doctor} />
                </div>
              );
            })}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Relationship advice" key={1}>
          <div className="card-grid">
            {raDoctors.map((doctor, index) => {
              return (
                <div key={index} className="m-2">
                  <DoctorProfileCard doctor={doctor} />
                </div>
              );
            })}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Career counseling" key={2}>
          <div className="card-grid">
            {ccDoctors.map((doctor, index) => {
              return (
                <div key={index} className="m-2">
                  <DoctorProfileCard doctor={doctor} />
                </div>
              );
            })}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Social anxiety" key={3}>
          <div className="card-grid">
            {saDoctors.map((doctor, index) => {
              return (
                <div key={index} className="m-2">
                  <DoctorProfileCard doctor={doctor} />
                </div>
              );
            })}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}
