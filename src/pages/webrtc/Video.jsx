import React from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import VideoInput from "./webrtcPages/videoInput";


export default function Video() {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <VideoInput name={user?.name} />
    </Layout>
  );
}
