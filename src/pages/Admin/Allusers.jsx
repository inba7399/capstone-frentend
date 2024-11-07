import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Table } from "antd";
import moment from "moment";

export default function Allusers() {
  const [user, serUser] = useState();
  const dispatch = useDispatch();
  const getAllRequists = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://capstone-backend-afk6.onrender.com/api/admin/get-all-users"
      );
      dispatch(hideLoading());
      const users = response.data;
      serUser(users);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllRequists();
  }, []);

  const data = user?.data;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "_id",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Block user",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <a className="btn btn-outline-danger btn-sm">Block</a>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-title">All Users</h1>
      <hr />
      <div>
        <Table className="pt-2" dataSource={data} columns={columns}></Table>
      </div>
    </Layout>
  );
}
