import { Col, Image, PageHeader, Row, Typography } from 'antd';
import React from 'react';
const { Paragraph } = Typography

const CCPageHeader = (props) => {
  const content = (
    <>
      <Paragraph>
        Ant Design interprets the color system into two levels: a system-level color system and a
        product-level color system.
      </Paragraph>
      <Paragraph>
        Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
        easier for designers to have a clear psychological expectation of color when adjusting colors,
        as well as facilitate communication in teams.
      </Paragraph>
    </>
  );

  const Content = ({ children, extraContent }) => (
    <Row>
      <Col lg={20} md={18} sm={12} xs={24}>
        {children}
      </Col>
      <Col lg={4} md={6} sm={12} xs={24} className="image">
        {extraContent}
      </Col>
    </Row>
  );
  return (
    <PageHeader
      title="Sản phẩm"
      className="site-page-header"
      subTitle="This is a subtitle"
      avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
    >
      <Content
        extraContent={
          <Image
            src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
            alt="content"
            width="100%"
          />
        }
      >
        {content}
      </Content>
    </PageHeader>
  );
};

export default CCPageHeader;