import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { Card, Row, Col, Form, Input, Button, Tabs, Select, message } from 'antd';
import AdminMailService from '@/service/AdminService/AdminMailService';
import AdminSettingService from '@/service/AdminService/AdminSettingService';

const { TabPane } = Tabs;

const ChangePassword = forwardRef((props, ref) => {
  return (
    <Form onFinish={props?.passwordSubmit} ref={ref} layout="vertical">
      <Form.Item label={<h3>Đổi mật khẩu</h3>}>
        <Form.Item name="old_password">
          <Input.Password placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item name="new_password">
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item name="confirm_password">
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={props?.loading}>
            Xác nhận
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
});

const SettingMail = forwardRef((props, ref) => {
  useEffect(() => {
    let { mailRegister, mailPayment } = props?.settingMail;
    if (mailRegister) {
      ref.current.setFieldsValue({
        mailRegister: mailRegister._id,
      });
    }
    if (mailPayment) {
      ref.current.setFieldsValue({
        mailPayment: mailPayment._id,
      });
    }
  }, [props]);
  return (
    <Form ref={ref} onFinish={props.mailSubmit} layout="vertical">
      <Form.Item label={'Mail đăng kí'} name="mailRegister">
        <Select>
          {props.options?.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={'Mail Thanh Toán'} name="mailPayment">
        <Select>
          {props.options?.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={props?.loading}>
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
});

const AdminSetting = () => {
  const formRef = useRef();
  const mailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [settingMail, setSettingMail] = useState({});

  useEffect(() => {
    fetchTemplateMail();
    fetchSetting();
  }, []);

  const passwordSubmit = (val) => {
    console.log(val);
  };

  const mailSubmit = async (val) => {
    try {
      setLoading(true);
      let res = await AdminSettingService.updateSetting({ ...val });
      message.success(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      fetchSetting();
    }
  };

  const fetchTemplateMail = async (page = 1) => {
    setLoading(true);
    let params = { page: page };
    try {
      let res = await AdminMailService.getTemplate(params);
      if (res.data.status === 200) {
        setOptions(res.data.data._template);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSetting = async () => {
    try {
      setLoading(true);
      let res = await AdminSettingService.getSetting();
      let { data } = res.data;
      setSettingMail(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const tabList = [
    {
      name: 'Đổi mật khẩu',
      content: <ChangePassword passwordSubmit={passwordSubmit} ref={formRef} loading={loading} />,
    },
    {
      name: 'Mail',
      content: (
        <SettingMail
          mailSubmit={mailSubmit}
          ref={mailRef}
          options={options}
          settingMail={settingMail}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <Card title="Cài đặt">
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            {tabList.map((tab, i) => (
              <TabPane tab={tab.name} key={[tab.name, i]}>
                {tab.content}
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};

export default AdminSetting;
