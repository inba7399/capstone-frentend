import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Table } from "antd";

export default function DoctorReq() {
  const [drRequist, setDrRequist] = useState();
  const dispatch = useDispatch();
  const getAllRequists = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://capstone-backend-afk6.onrender.com/api/admin/get-all-docotor"
      );
      dispatch(hideLoading());
      const docData = response.data;
      setDrRequist(docData);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllRequists();
  }, []);

  const handleApprove = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://capstone-backend-afk6.onrender.com/api/admin/change-doctor-status",
        { doctorId: record._id, userId: record.userId, status }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDrRequist(response.data.data);
        getAllRequists();
        toast.success("Updated successfully");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  const data = drRequist?.data;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <p>
          {record.firstName} {record.lastName}
        </p>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "_id",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "_id",
    },
    {
      title: "Price(₹)",
      dataIndex: "price",
      key: "_id",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "_id",
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <a
              onClick={() => handleApprove(record, "approved")}
              className="btn btn-outline-success btn-sm"
            >
              Approve
            </a>
          )}
          {record.status === "approved" && (
            <a
              onClick={() => handleApprove(record, "blocked")}
              className="btn btn-outline-danger btn-sm"
            >
              Block
            </a>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-title">All Doctors</h1>
      <hr />
      <div>
        <Table className="pt-2" dataSource={data} columns={columns}></Table>
      </div>
    </Layout>
  );
}
