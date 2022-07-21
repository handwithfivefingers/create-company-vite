import { Col, Form, InputNumber, Row } from 'antd';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import CCInput from '@/components/CCInput';
import { FormFieldText } from '@/contants/Common';
import styles from './styles.module.scss';

const GiaTriGopVon = forwardRef((props, ref) => {
  const { current, BASE_FORM } = props;
  const checkInputValidation = (e) => {
    let pattern = /[1-9]/g;
    ref.current.setFields([
      {
        name: [...BASE_FORM, 'base_val', 'char'],
        errors: (e.target.value.match(pattern) && ['Vui lòng không nhập kí tự khác ngoài chữ']) || [],
      },
    ]);
 
  };

  return (
    <Row
      gutter={[16, 12]}
      className={clsx([
        styles.hide,
        {
          [styles.visible]: current === 1,
        },
      ])}
    >
      <Col lg={12} md={12} sm={24} xs={24}>
        <Form.Item name={[...BASE_FORM, 'base_val', 'num']} label={FormFieldText['base_val']['num']}>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          type="text"
          name={[...BASE_FORM, 'base_val', 'char']}
          label={FormFieldText['base_val']['char']}
          onChange={(e) => checkInputValidation(e)}
        />
      </Col>
    </Row>
  );
});

export default GiaTriGopVon;
