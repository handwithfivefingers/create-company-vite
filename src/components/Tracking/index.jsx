import React, { useEffect, forwardRef, useState, useRef } from "react";
import { Card, Timeline, Row, Col, Button, Upload, Form, Input, Space, Select, message } from "antd";
import { UploadOutlined, StarOutlined } from "@ant-design/icons";
import Editor from "../Editor";
import axios from "../../config/axios";

export default function Tracking(props) {
  const [list, setList] = useState([]);
  const [content, setContent] = useState();
  const formRef = useRef();
  const editorRef = useRef();
  useEffect(() => {
    getTemplateMail();
  }, []);

  const getTemplateMail = () => {
    axios.get("/admin/template").then((res) => {
      if (res.data.status === 200) {
        setList(res.data.data);
      } else message.error(res.data.message);
    });
  };

  const handleSendMailWithAttach = () => {
    if (props.onFinishScreen) {
      props.onFinishScreen();
    }
  };

  const handleSelect = (e, o) => {
    setContent(o.data);
  };
  const onFinish = (val) => {
    let { template, attachments } = val;
    let email = props.data.orderOwner.email;
    let newContent = editorRef.current.getContent();
    if (props.onFinishScreen) {
      props.onFinishScreen(attachments, newContent, email);
    }
  };
  
  return (
    <Card title="Chức năng gửi mail đính kèm" bordered={false}>
      <Row>
        <Col span={8}>
          <Timeline pending="Recording...">
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          </Timeline>
        </Col>
        <Col span={16}>
          <Form onFinish={onFinish} ref={formRef}>
            <Form.Item name="template">
              <Select placeholder="Chọn mẫu tin nhắn" onSelect={handleSelect} style={{ width: "100%" }}>
                {list?._template?.map((item) => {
                  return (
                    <Select.Option key={item._id} value={item._id} data={item.content}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Editor content={content} ref={editorRef} />
            <Form.Item name="attachments">
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Space style={{ display: "flex", justifyContent: "center" }}>
              <Form.Item>
                <Button htmlType="submit">Gửi</Button>
              </Form.Item>
            </Space>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
