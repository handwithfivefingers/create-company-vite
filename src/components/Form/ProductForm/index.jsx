// import React from "react";
import React, { useState, useEffect, forwardRef } from "react";
import { Form, Select, Card, Space } from "antd";
import axios from "../../../config/axios";
const ProductForm = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = () => {
    setLoading(true);
    axios
      .get("/api/product")
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  };
  /**
   *
   * @returns Dropdown Product Item
   */

  const dropdownRender = () => {
    return (
      <Select>
        {props.data?.map((item) => {
          return (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    );
  };

  return (
    <Card style={{ minWidth: "350px" }} title="Chọn loại hình doanh nghiệp">
      <Form ref={ref}>
        <Form.Item name="selectProduct" required>
          {dropdownRender()}
        </Form.Item>
      </Form>
    </Card>
  );
});

export default ProductForm;
