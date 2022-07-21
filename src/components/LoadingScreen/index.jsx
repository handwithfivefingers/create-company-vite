import React from "react";
import { Layout, Spin, Result } from "antd";

export default function LoadingScreen() {
  return (
    <Layout
      style={{ minHeight: "100vh", opacity: 1, position: "fixed", top: "0", left: 0, right: 0, bottom: 0, zIndex: 99 }}
    >
      <Result style={{ margin: "auto 0" }} icon={<></>} extra={<Spin />} />
    </Layout>
  );
}
