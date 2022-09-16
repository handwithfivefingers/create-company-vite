import { Button, Col, Form, InputNumber, Row, Space } from "antd";
import clsx from "clsx";
import React, { forwardRef, useState } from "react";
import CCInput from "@/components/CCInput";
import { SELECT } from "@/constant/Common";
import styles from "../DaiDienPhapLuat/styles.module.scss";
const BASE_FORM = ["change_info", "transfer_contract"];
const HopDongChuyenNhuong = forwardRef((props, ref) => {
  const [sohuuA, setSohuuA] = useState();
  const [sohuuB, setSohuuB] = useState();
  const [type, setType] = useState("");

  const handleFill = () => {
    if (!ref) return;
    let val = ref.current.getFieldsValue();
    let { reg_address, town, district, city } = val.change_info.transfer_contract?.B_side?.personal;
    ref.current.setFieldsValue({
      change_info: {
        transfer_contract: {
          B_side: {
            personal: {
              contact_reg_address: reg_address,
              contact_town: town,
              contact_district: district,
              contact_city: city,
            },
          },
        },
      },
    });
  };

  const renderFormOnwerA = (condition, fieldName) => {
    let xhtml = null;

    if (condition === "personal") {
      xhtml = (
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "personal", "name"]} label="Họ và tên" placeholder="NGUYỄN VĂN A"/>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput type="date" name={[...fieldName, "personal", "birth_day"]} label="Ngày sinh" placeholder="Bấm chọn"/>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              type="select"
              name={[...fieldName, "personal", "doc_type"]}
              label="Loại giấy tờ pháp lý"
              options={SELECT.DOC_TYPE}
              placeholder="Bấm vào đây"
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "personal", "doc_code"]} label="Số giấy tờ pháp lý" />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput type="date" name={[...fieldName, "personal", "doc_time_provide"]} label="Ngày cấp" placeholder="Bấm chọn"/>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "personal", "doc_place_provide"]} label="Nơi cấp" />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "personal", "contact_address"]} label="Địa chỉ liên lạc" />
          </Col>
        </Row>
      );
    } else {
      // Chủ sở hữu là tổ chức
      // Trường hợp chủ sở hữu là tổ chức:
      // Tên doanh nghiệp
      // Mã số doanh nghiệp
      // Địa chỉ trụ sở chính
      // Người đại diện theo pháp luật của công ty:
      // Chức danh:
      xhtml = (
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "organization", "company_name"]} label="Tên doanh nghiệp" placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"/>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "organization", "mst"]} label="Mã số doanh nghiệp hoặc Mã số thuế" placeholder="0316184427"/>
          </Col>
          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <CCInput
                name={[...fieldName, "organization", "company_address", "street"]}
                label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
              />

              <CCInput name={[...fieldName, "organization", "company_address", "town"]} label="Xã/Phường/Thị trấn" />

              <CCInput
                name={[...fieldName, "organization", "company_address", "district"]}
                label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
              />

              <CCInput name={[...fieldName, "organization", "company_address", "city"]} label="Tỉnh/Thành phố" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <CCInput
              name={[...fieldName, "organization", "legal_representative"]}
              label="Người đại diện theo pháp luật của công ty"
            />
          </Col>
          {/** ???? */}
        </Row>
      );
    }
    return xhtml;
  };

  const renderFormOwnerB = (condition, fieldName) => {
    let xhtml = null;

    if (condition === "personal") {
      xhtml = // chủ sở hữu là cá nhân
        (
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, "personal", "name"]} label="Họ và tên" placeholder="NGUYỄN VĂN A"/>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput
                name={[...fieldName, "personal", "gender"]}
                label="Giới tính"
                type="select"
                options={SELECT.GENDER}
                placeholder="Bấm vào đây"
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, "personal", "birth_day"]} label="Ngày sinh" type="date" placeholder="Bấm chọn"/>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, "personal", "per_type"]} label="Dân tộc" />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput
                type="select"
                name={[...fieldName, "personal", "doc_type"]}
                label="Loại giấy tờ pháp lý"
                options={SELECT.DOC_TYPE}
                placeholder="Bấm vào đây"
              />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, "personal", "doc_code"]} label="Số giấy tờ pháp lý" />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, "personal", "doc_time_provide"]} label="Ngày cấp" type="date" placeholder="Bấm chọn"/>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput name={[...fieldName, "personal", "doc_place_provide"]} label="Nơi cấp" />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Địa chỉ thường trú">
                <CCInput
                  name={[...fieldName, "personal", "reg_address"]}
                  label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
                />

                <CCInput name={[...fieldName, "personal", "town"]} label="Xã/Phường/Thị Trấn" />

                <CCInput name={[...fieldName, "personal", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh" />

                <CCInput name={[...fieldName, "personal", "city"]} label="Tỉnh/Thành phố" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Địa chỉ liên lạc">
                <Button onClick={handleFill}>Tự động điền</Button>
                <CCInput
                  name={[...fieldName, "personal", "contact_reg_address"]}
                  label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
                />

                <CCInput name={[...fieldName, "personal", "contact_town"]} label="Xã/Phường/Thị Trấn" />

                <CCInput
                  name={[...fieldName, "personal", "contact_district"]}
                  label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh"
                />

                <CCInput name={[...fieldName, "personal", "contact_city"]} label="Tỉnh/Thành phố" />
              </Form.Item>
            </Col>
          </Row>
        );
    } else {
      // Trường hợp chủ sở hữu là tổ chức:
      xhtml = (
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "organization", "company_name"]} label="Tên doanh nghiệp" />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "organization", "mst"]} label="Mã số doanh nghiệp" />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "organization", "time_provide"]} label="Ngày cấp" />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...fieldName, "organization", "place_provide"]} label="Nơi cấp" />
          </Col>
          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <CCInput
                name={[...fieldName, "organization", "company_address", "street"]}
                label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
              />

              <CCInput name={[...fieldName, "organization", "company_address", "town"]} label="Xã/Phường/Thị trấn" />

              <CCInput
                name={[...fieldName, "organization", "company_address", "district"]}
                label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
              />

              <CCInput name={[...fieldName, "organization", "company_address", "city"]} label="Tỉnh/Thành phố" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <CCInput
              type="select"
              name={[...fieldName, "organization", "company_model"]}
              label="Mô hình công ty"
              options={SELECT.COMPANY_MODEL}
            />
          </Col>
          <Col span={24}>
            <CCInput
              name={[...fieldName, "organization", "legal_representative"]}
              label="Người đại diện theo pháp luật của công ty"
            />
          </Col>
          <Col span={24}>
            <CCInput name={[...fieldName, "organization", "legal_title"]} label="Chức danh" />
          </Col>

          <Col span={24}>
            <Form.Item label="Bên A hiện đang sở hữu phần vốn góp là">
              <Form.Item name={[...fieldName, "organization", "capital_contribution", "current_value"]}>
                <InputNumber />
              </Form.Item>
              <CCInput
                type="select"
                style={{ width: "100%" }}
                name={[...fieldName, "organization", "capital_contribution", "type"]}
                onChange={(e) => setType(e)}
                options={SELECT.CONTRIBUTE}
              />
              <CCInput label="Chiếm tỷ lệ ... %" name={[...fieldName, "organization", "capital_contribution", "current_A_percent"]}/>
            </Form.Item>
          </Col>

          {type === "Chuyển nhượng một phần vốn góp" ? (
            <>
              <Col span={24}>
                <Form.Item
                  name={[...fieldName, "organization", "capital_contribution", "will"]}
                  label="Phần vốn góp bên A muốn chuyển nhượng"
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={[...fieldName, "organization", "capital_contribution", "transfer_price"]}
                  label="Giá chuyển nhượng"
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={24}>
                <CCInput
                  name={[...fieldName, "organization", "capital_contribution", "time_end"]}
                  label="Thời điểm hoàn thành việc chuyển nhượng (Chọn Ngày/ tháng/ năm)"
                  type="date"
                  inputReadOnly={false}
                />
              </Col>
            </>
          ) : (
            ""
          )}
        </Row>
      );
    }
    return xhtml;
  };

  return (
    <Form.Item
      label={<h3>Hợp đồng chuyển nhượng phần góp vốn</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <CCInput label="Tên doanh nghiệp" name={[...BASE_FORM, "company_name"]} />

      <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={[...BASE_FORM, "mst"]} /> */}

      <Form.Item 
      // label="Bên chuyển nhượng phần góp vốn (bên A)"
      label={
        <div
          dangerouslySetInnerHTML={{
            __html: '<b>Bên chuyển nhượng phần góp vốn (bên A)</b>',
          }}
        />
      }
      >
        <CCInput
          type="select"
          label="Chủ sở hữu"
          name={[...BASE_FORM, "A_side", "owner"]}
          onChange={(e) => setSohuuA(e)}
          options={SELECT.OWNER}
          placeholder="Bấm vào đây"
        />

        {renderFormOnwerA(sohuuA, [...BASE_FORM, "A_side"])}
      </Form.Item>

      <Form.Item 
      // label="Bên nhận chuyển nhượng phần vốn góp (Bên B)"
      label={
        <div
          dangerouslySetInnerHTML={{
            __html: '<b>Bên nhận chuyển nhượng phần vốn góp (Bên B)</b>',
          }}
        />
      }
      >
        <CCInput
          type="select"
          label="Chủ sở hữu"
          name={[...BASE_FORM, "B_side", "owner"]}
          onChange={(e) => setSohuuB(e)}
          options={SELECT.OWNER}
          placeholder="Bấm vào đây"
        />

        {renderFormOwnerB(sohuuB, [...BASE_FORM, "B_side"])}
      </Form.Item>
    </Form.Item>
  );
});

export default HopDongChuyenNhuong;
