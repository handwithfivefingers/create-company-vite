import { Col, Form, Row } from "antd";
import clsx from "clsx";
import React, { forwardRef, useEffect } from "react";
import CCInput from "@/components/CCInput";
import styles from "../DaiDienPhapLuat/styles.module.scss";

const BASE_FORM = ["change_info", "down_authorized_capital"];
const GiamVonDieuLe = forwardRef((props, ref) => {
  useEffect(() => {
    if (ref) {
      ref.current.setFieldsValue({
        change_info: {
          down_authorized_capital: {
            type: "Hoàn trả vốn góp",
          },
        },
      });
    }
  }, [ref]);

  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi vốn điều lệ</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Row gutter={[16, 0]}>
        {/* <Col span={24}>
          <CCInput label="Tên doanh nghiệp" name={["change_info", "down_authorized_capital", "company_name"]} />
        </Col>
        <Col span={24}>
          <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "down_authorized_capital", "mst"]} />
        </Col> */}
        <Col span={12}>
          <CCInput 
          // label="Vốn điều lệ đã đăng ký (bằng số)" 
          label={
            <div
              dangerouslySetInnerHTML={{
                __html: 'Vốn điều lệ đã đăng ký <i>(bằng số)</i>',
              }}
            />
          }
          name={[...BASE_FORM, "base_val", "num"]} />
        </Col>
        <Col span={12}>
          <CCInput 
          // label="Vốn điều lệ đã đăng ký (bằng chữ)" 
          label={
            <div
              dangerouslySetInnerHTML={{
                __html: 'Vốn điều lệ đã đăng ký <i>(bằng chữ)</i>',
              }}
            />
          }
          name={[...BASE_FORM, "base_val", "char"]} />
        </Col>
        <Col span={12}>
          <CCInput 
          // label="Vốn điều lệ sau khi giảm (bằng số)" 
          label={
            <div
              dangerouslySetInnerHTML={{
                __html: 'Vốn điều lệ sau khi giảm <i>(bằng số)</i>',
              }}
            />
          }
          name={[...BASE_FORM, "new_base_val", "num"]} />
        </Col>
        <Col span={12}>
          <CCInput 
          //label="Vốn điều lệ sau khi giảm (bằng chữ)" 
          label={
            <div
              dangerouslySetInnerHTML={{
                __html: 'Vốn điều lệ sau khi giảm <i>(bằng chữ)</i>',
              }}
            />
          }
          name={[...BASE_FORM, "new_base_val", "char"]} />
        </Col>

        <Col span={24}>
          <CCInput label="Hình thức giảm vốn" name={[...BASE_FORM, "type"]} />
        </Col>
      </Row>
      {/* </Form> */}
    </Form.Item>
  );
});

export default GiamVonDieuLe;
