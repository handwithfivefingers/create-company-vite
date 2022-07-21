import ProfileService from "@/service/UserService/ProfileService";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const passRef = useRef();
  const profileRef = useRef();
  const screen = useBreakpoint();

  useEffect(() => {
    getScreenData();
  }, []);

  useEffect(() => {
    profileRef.current.setFieldsValue({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
  }, [data]);

  const getScreenData = () => {
    setLoading(true);
    ProfileService.getProfile()
      .then((res) => {
        const { status, data } = res.data;
        if (status === 200) {
          setData(data);
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const onPassChange = (val) => {
    setLoading(true);
    ProfileService.changePassword(val)
      .then((res) => {
        if (res.data.status === 200) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        getScreenData();
      });
  };

  const onProfileChange = (val) => {
    setLoading(true);
    ProfileService.changeProfile(val)
      .then((res) => {
        if (res.data.status === 200) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        getScreenData();
      });
  };

  return (
    <Row gutter={[16, 12]}>
      <Col lg={8} sm={24} xs={24} md={12} order={!screen.md ? 1 : 0}>
        <Card title="Đổi mật khẩu" style={{ height: "100%" }}>
          <Form onFinish={onPassChange} ref={passRef} layout="vertical">
            <Form.Item label="Mật khẩu hiện tại" name="old_password">
              <Input />
            </Form.Item>

            <Form.Item label="Mật khẩu mới" name="new_password">
              <Input />
            </Form.Item>

            <Form.Item label="Xác thực mật khẩu" name="confirm_password">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col lg={16} sm={24} xs={24} md={12}>
        <Card title="Thông tin cá nhân">
          <Form onFinish={onProfileChange} ref={profileRef} layout="vertical">
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default UserProfile;
