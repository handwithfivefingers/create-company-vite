// import React from "react";
import React, { useState, useEffect, useRef } from "react";
import { Form, Select, Card, Space, Input, Button, InputNumber } from "antd";
import axios from "../../../config/axios";
const ProductForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const formRef = useRef();
  useEffect(() => {
    // getScreenData();
  }, []);

  // const getScreenData = () => {
  //   setLoading(true);
  //   axios
  //     .get("/api/category")
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         setData(res.data.data);
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // };
  const onFinish = (val) => {
    if (props.onFinishScreen) {
      props.onFinishScreen(val);
    }
  };
  return (
    <Card style={{ minWidth: "350px" }} title="Danh mục" bordered={false}>
      <Form ref={formRef} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Tên Danh Mục" required>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Giá tiền">
          <Input />
        </Form.Item>

        <Form.Item name="type" label="Loại Danh mục" required>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Space size="small" style={{ float: "right" }}>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
            <Button type="outline">Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductForm;
