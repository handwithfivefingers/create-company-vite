import { Button, Form, Input, message, Spin } from "antd";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import CCEditor from "../../../../components/Editor";
import axios from "../../../../config/axios";
import styles from "./styles.module.scss";

export default function EditMail() {
  const [name, setName] = useState();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSave = () => {
    // console.log(name, content);
    if (!name) return;
    if (!content) return;

    setLoading(true);
    axios
      .post("/admin/template/create", { name, subject, content })
      .then((res) => {
        if (res.data.status === 201) {
          message.success(res.data.message);
        } else message.error(res.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.mail}>
      <div className={styles.header}>
        <div className={styles.title}>Mail Template</div>
        <div className={styles.action}>
          <Button type="text" onClick={() => router.back()}>
            <RiArrowGoBackFill style={{ fontSize: 16 }} />
          </Button>
        </div>
      </div>
      <Form.Item>
        <Input placeholder={"Tiêu đề"} onChange={(e) => setName(e.target.value)} />
      </Form.Item>

      <Form.Item>
        <Input placeholder={"Subject"} onChange={(e) => setSubject(e.target.value)} />
      </Form.Item>
      
      {/* subject text */}

      <CCEditor content={content} onChange={(e) => setContent(e)} />

      <Button className={styles.submit} onClick={handleSave}>
        Submit
      </Button>

      <div
        className={clsx([styles.loading], {
          [styles.loadingActive]: loading,
        })}
      >
        <Spin spinning={loading} />
      </div>
    </div>
  );
}
