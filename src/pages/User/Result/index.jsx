import React from "react";
import { Result, Button } from "antd";
import { useNavigate, useSearchParams, useNavigationType } from "react-router-dom";
export default function CCResult() {
  let [params] = useSearchParams();
  let type = useNavigationType();
  let searchText = params.get("text");
  let navigate = useNavigate();
  if (!searchText) {
    if (type !== "POP") {
      navigate(-1);
    } else {
      navigate("/user");
    }
  }
  return (
    <Result
      status="success"
      title={searchText}
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" onClick={() => navigate("/user/order")}>
          Kiểm tra đơn hàng
        </Button>,
        <Button onClick={() => navigate("/user/san-pham")}>Về trang sản phẩm</Button>,
      ]}
    />
  );
}
