import { Form, Input, Card, Button, message, Select, InputNumber } from "antd";
import axios from "../../../config/axios";
import React, { useState, useEffect, useRef } from "react";
import ProductService from "../../../service/ProductService";
import { number_format } from "../../../helper/Common";
const FormProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [cateData, setCateData] = useState([]);
  const formRef = useRef();
  useEffect(() => {
    formRef.current.setFieldsValue({
      name: props?.data?.name || "",
      price: props?.data?.price || "",
      type: props?.data?.type || "",
      parentId: props?.data?.parentId?.map((item) => item._id) || [],
      categories: props?.data?.categories?.map((item) => item._id) || [],
    });
    getScreenData();
    getCateData();
  }, [props]);

  const getScreenData = () => {
    ProductService.getProducts()
      .then((res) => {
        if (res.data.status === 200) {
          let { data } = res.data;
          setProductData(data);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally();
  };

  const getCateData = () => {
    ProductService.getCategories()
      .then((res) => {
        if (res.data.status === 200) {
          let { data } = res.data;
          setCateData(data);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally();
  };

  const onFinish = (val) => {
    // handle product
    let { name, price, type, parentId, categories } = val;

    let params = { name, price, type, categories };
    // console.log(props);
    if (parentId) {
      params.parentId = parentId;
    }

    if (props.type == "edit") {
      params._id = props.data._id;
      props.onEventEdit(params);
    }
    if (props.type == "add") {
      props.onEventAdd(params);
    }
    if (props.onFinishScreen) {
      props.onFinishScreen();
    }
  };

  // console.log(props, productData);
  return (
    <Card title={props.type == "edit" ? "Chỉnh sửa" : "Thêm sản phẩm"} bordered={false}>
      <Form onFinish={onFinish} layout="vertical" ref={formRef}>
        <Form.Item label="Danh mục" name="categories" 
        // initialValue={{

        // }}
        >
          <Select
            showSearch
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            // onChange={handleChange}
            optionFilterProp="children"
            // defaultValue={[]}
            filterOption={(input, option) => option.children?.join("")?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0}
          >
            {cateData?.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Sản phẩm chính" name="parentId">
          <Select
            showSearch
            mode="multiple"
            allowClear
            // defaultValue={props?.data?.parentId?.map((item) => item._id) || []}
            optionFilterProp="children"
            filterOption={(input, option) => option.children?.join("")?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0}
            style={{ width: "100%" }}
            placeholder="Please select"
          >
            {productData?.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Tên sản phẩm" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Giá tiền" name="price">
          <InputNumber
            // formatter={(val) => number_format(val)}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormProduct;
