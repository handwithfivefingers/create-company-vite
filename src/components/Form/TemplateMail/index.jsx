import React, { memo, useEffect, useRef, useState } from 'react';
import { Card, Form, Button, message, Spin, Input } from 'antd';
import CCEditor from '../../Editor';
import { RiArrowGoBackFill, RiCloseFill } from 'react-icons/ri';
import styles from './styles.module.scss';
import axios from '@/config/axios';
import AdminMailService from '@/service/AdminService/AdminMailService';
import clsx from 'clsx';

const TemplateMail = (props) => {
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [subject, setSubject] = useState();
  const [loading, setLoading] = useState(false);
  const editorRef = useRef();

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setContent(props.content);
      setSubject(props.data.subject);
    }
    return () => {
      setName();
      setContent();
      setSubject();
    };
  }, [props]);

  const handleSave = async () => {
    if (name.length <= 1) return;
    let newContent = editorRef.current.getContent();
    if (newContent.length <= 1) return;
    setLoading(true);

    // Add new
    if (props.type === 1) {
      try {
        let res = await AdminMailService.addTemplate({ name, subject, content: newContent });
        if (res.data.status === 201) {
          message.success(res.data.message);
        } else message.error(res.data.message);
      } catch (err) {
        message.error(err) || console.log(err);
      } finally {
        if (props.onFinishScreen) {
          props.onFinishScreen();
        }
        setLoading(false);
      }
    }
    if (props.type === 2) {
      try {
        let res = await AdminMailService.editTemplate({
          _id: props.data._id,
          name,
          content: newContent,
          subject,
        });
        if (res.data.status === 200) {
          message.success(res.data.message);
        } else message.error(res.data.message);
      } catch (err) {
        message.error(err) || console.log(err);
      } finally {
        if (props.onFinishScreen) {
          props.onFinishScreen();
        }
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.mail}>
      <Input size="middle" placeholder={'Tiêu đề'} value={name} onChange={(e) => setName(e.target.value)} />

      <Input size="middle" placeholder={'Subject'} value={subject} onChange={(e) => setSubject(e.target.value)} />

      <CCEditor content={content} ref={editorRef} />

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
  
};

export default memo(TemplateMail);
