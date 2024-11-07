import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
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
        "https://capstone-backend-afk6.onrender.com/api/doctor/get-appointments-by-doctor-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        {}
      );
      dispatch(hideLoading());
      const appointments = response.data;
      setAppointments(appointments.data);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  const handleApprove = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/doctor/change-appointment-status",
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getAllAppointments();
  }, []);
  console.log(appointments);
  const columns = [
    {
      title: "Patient",
      dataIndex: "doctor",
      render: (text, record) => <p>{record.userInfo.name}</p>,
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
                className={`btn btn-sm  btn-outline-primary ${
                  record.status === "approved" ? "" : "disabled"
                }`}
                onClick={() => {
                  toast.success("copyed to clipboard");
                }}
              >
                <i class="ri-clipboard-line"></i>copy
              </a>
            </CopyToClipboard>
          }
        </div>
      ),
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div>
          {
            <div className=" btn-group btn-group-sm ">
              <a
                onClick={() => {
                  handleApprove(record, "approved");
                  window.location.reload();
                }}
                className="btn btn-outline-success "
              >
                Approve
              </a>
              <a
                onClick={() => {
                  handleApprove(record, "rejected");
                  window.location.reload();
                }}
                className="btn btn-outline-danger "
              >
                Reject
              </a>
            </div>
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
