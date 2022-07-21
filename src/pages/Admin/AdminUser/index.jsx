import React, { useEffect, useState } from 'react';
import { Card, message, Modal, Table, Button } from 'antd';
import AdminUserService from '@/service/AdminService/AdminUserService';
import styles from './styles.module.scss';
const AdminUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    setLoading(true);
    AdminUserService.getUser()
      .then((res) => {
        let { status, data } = res.data;
        if (status === 200) {
          setData(data._user);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Warning',
      content: `Bạn có chắc chắn muốn xóa user ${record.name}?`,
      onOk: () => {
        setLoading(true);
        AdminUserService.deleteUser(record._id)
          .then((res) => {
            if (res.data.status === 200) {
              message.success(res.data.message);
            } else {
              message.error(res.data.message);
            }
          })
          .finally(() => fetchUser());
      },
    });
  };
  return (
    <Card title="Quản lý người dùng" className="cc-card">
      <Table
        size="small"
        loading={{
          spinning: loading,
          tip: 'Loading...',
          delay: 100,
        }}
        dataSource={data}
        pagination={{
          className: styles.pagination,
        }}
        rowKey={(record) => record._id}
        scroll={{ x: 768 }}
        bordered
      >
        <Table.Column
          title="Tên người dùng"
          className={styles.inline}
          width={'25%'}
          render={(v, record, i) => record.name}
        />
        <Table.Column title="Email" render={(v, record, i) => record.email} />
        <Table.Column title="Số điện thoại" className={styles.inline} render={(v, record, i) => record.phone} />
        <Table.Column title="Role" width={'50px'} render={(v, record, i) => record.role} />
        <Table.Column title="Ngày khởi tạo" render={(v, record, i) => record.createdAt.substring(0, 10)} />
        <Table.Column
          title=""
          width={'50px'}
          render={(v, record, i) => <Button onClick={() => handleDelete(record)}>Xóa</Button>}
        />
      </Table>
    </Card>
  );
};

export default AdminUser;
