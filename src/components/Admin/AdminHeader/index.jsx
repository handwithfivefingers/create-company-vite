import { PageHeader } from 'antd';
import React from 'react';

const AdminHeader = (props) => {
  return (
    <PageHeader key="adminHeader" className="site-page-header" onBack={props?.onBack} title={props?.title} subTitle={props?.subTitle} />
  );
};

export default AdminHeader;
