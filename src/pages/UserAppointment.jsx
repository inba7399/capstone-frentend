import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Table } from "antd";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function UserAppointment() {
  const [appointments, setAppointments] = useState();
  const dispatch = useDispatch();
  const getAllAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://capstone-backend-afk6.onrender.com/api/user/get-appointments-by-user-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      const appointments = response.data;
      setAppointments(appointments.data);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  const columns = [
    {
      title: "Doctor",
      dataIndex: "doctor",
      render: (text, record) => (
        <p>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </p>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <p>{record.doctorInfo.phoneNumber}</p>,
    },
    {
      title: "Date & Time",
      dataIndex: "cratedAt",
      render: (text, record) => (
        <p>
          {moment(record.date).format("DD-MM-YYYY")}
          {" / "}
          {moment(record.time).format("HH:mm")}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Room id",
      dataIndex: "room",
      render: (text, record) => (
        <div>
          {
            <CopyToClipboard text={record?.room}>
              <a
                className={
                  record.status === "approved"
                    ? "btn btn-primary "
                    : "btn btn-primary disabled "
                }
                onClick={() => {
                  toast.success("copyed to clipboard");
                }}
              >
                <i class="ri-clipboard-line"></i>
              </a>
            </CopyToClipboard>
          }
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-title">Appointments</h1>
      <hr />
      <div>
        <Table
          className="pt-2"
          dataSource={appointments}
          columns={columns}
        ></Table>
      </div>
    </Layout>
  );
}
