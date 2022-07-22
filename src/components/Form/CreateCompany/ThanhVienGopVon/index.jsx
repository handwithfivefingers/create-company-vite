import React, { forwardRef, useState, useEffect } from "react";
import { Form, Row, Col, InputNumber } from "antd";
import CCInput from "@/components/CCInput";
import { FormFieldText } from "@/constant/Common";
import { number_format } from "@/helper/Common";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { SELECT } from "@/constant/Common";

const ThanhVienGopVon = forwardRef((props, ref) => {
  const [present, setPresent] = useState("");

  const { current, BASE_FORM } = props;

  useEffect(() => {
    if (present === "organization") {
      ref.current.setFieldsValue({
        create_company: {
          approve: {
            origin_person: {
              company: {
                national: "Việt Nam",
              },
            },
          },
        },
      });
    }
  }, [present]);

  const renderPresentPerson = () => {
    let xhtml = null;

    if (present === "personal") {
      xhtml = (
        <div className={styles.groupInput}>
          <CCInput name={[...BASE_FORM, "origin_person", "name"]} label={FormFieldText["origin_person"]} />

          <CCInput type="date" name={[...BASE_FORM, "origin_person", "birth_day"]} label="Ngày sinh" />

          <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "gender"]}
            label="Giới tính"
            options={SELECT.GENDER}
          />

          <CCInput name={[...BASE_FORM, "origin_person", "per_type"]} label="Dân tộc" />

          <CCInput name={[...BASE_FORM, "origin_person", "national"]} label="Quốc tịch" />

          <CCInput name={[...BASE_FORM, "origin_person", "reg_address"]} label="Nơi đăng kí hộ khẩu thường trú" />

          <CCInput name={[...BASE_FORM, "origin_person", "current_address"]} label="Chỗ ở hiện tại" />

          <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "doc_type"]}
            label="Loại giấy tờ"
            defaultValue="Chứng minh nhân dân"
            options={SELECT.DOC_TYPE}
          />

          <CCInput label={"Số CMND/ CCCD/ Hộ chiếu"} name={[...BASE_FORM, "origin_person", "doc_code"]} />

          <CCInput type="date" name={[...BASE_FORM, "origin_person", "doc_time_provide"]} label="Ngày cấp" />

          <CCInput name={[...BASE_FORM, "origin_person", "doc_place_provide"]} label="Nơi cấp" />

          <Form.Item label="Địa chỉ thường trú" className={styles.newLine}>
            <CCInput
              label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
              name={[...BASE_FORM, "origin_person", "current", "address"]}
            />

            <CCInput label="Xã/Phường/Thị trấn" name={[...BASE_FORM, "origin_person", "current", "town"]} />

            <CCInput
              label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
              name={[...BASE_FORM, "origin_person", "current", "district"]}
            />

            <CCInput label="Tỉnh/Thành phố" name={[...BASE_FORM, "origin_person", "current", "city"]} />
          </Form.Item>

          <Form.Item label="Địa chỉ liên lạc" className={styles.newLine}>
            <CCInput
              label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
              name={[...BASE_FORM, "origin_person", "contact", "address"]}
            />

            <CCInput label="Xã/Phường/Thị trấn" name={[...BASE_FORM, "origin_person", "contact", "town"]} />

            <CCInput
              label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
              name={[...BASE_FORM, "origin_person", "contact", "district"]}
            />

            <CCInput label="Tỉnh/Thành phố" name={[...BASE_FORM, "origin_person", "contact", "city"]} />
          </Form.Item>

          <CCInput label="Số điện thoại" name={[...BASE_FORM, "origin_person", "contact", "phone"]} />

          <Form.Item name={[...BASE_FORM, "company_value"]} label="Giá trị góp vốn">
            <InputNumber formatter={(val) => `${number_format(val)}`} style={{ width: "100%" }} />
          </Form.Item>
        </div>
      );
    } else if (present === "organization") {
      xhtml = (
        <div className={styles.groupInput}>
          <CCInput name={[...BASE_FORM, "origin_person", "name"]} label={"Tên người đại diện"} />

          <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "title"]}
            label="Chức danh"
            options={SELECT.TITLE}
          />

          <CCInput type="date" name={[...BASE_FORM, "origin_person", "birth_day"]} label="Ngày sinh" />

          <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "gender"]}
            label="Giới tính"
            options={SELECT.GENDER}
          />

          <CCInput name={[...BASE_FORM, "origin_person", "per_type"]} label="Dân tộc" />

          <CCInput name={[...BASE_FORM, "origin_person", "national"]} label="Quốc tịch" />

          <Form.Item label="Địa chỉ trụ sở chính">
            <CCInput
              name={[...BASE_FORM, "origin_person", "company", "address"]}
              label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
            />

            <CCInput name={[...BASE_FORM, "origin_person", "company", "town"]} label="Xã/Phường/Thị trấn" />

            <CCInput
              name={[...BASE_FORM, "origin_person", "company", "district"]}
              label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
            />

            <CCInput name={[...BASE_FORM, "origin_person", "company", "city"]} label="Tỉnh/Thành phố" />

            <CCInput name={[...BASE_FORM, "origin_person", "company", "national"]} label="Quốc gia" />
          </Form.Item>

          <Form.Item label="Địa chỉ liên lạc">
            <CCInput
              name={[...BASE_FORM, "origin_person", "contact", "address"]}
              label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
            />

            <CCInput name={[...BASE_FORM, "origin_person", "company_town"]} label="Xã/Phường/Thị trấn" />

            <CCInput
              name={[...BASE_FORM, "origin_person", "contact", "district"]}
              label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
            />

            <CCInput name={[...BASE_FORM, "origin_person", "contact", "city"]} label="Tỉnh/Thành phố" />
          </Form.Item>

          <CCInput label={"Tên tổ chức"} name={[...BASE_FORM, "origin_person", "organization_name"]} />

          <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "doc_type"]}
            label="Loại giấy tờ"
            defaultValue="Chứng minh nhân dân"
            disabled
            defaultActiveFirstOption
            options={[
              {
                name: "Chứng minh nhân dân",
                value: "Chứng minh nhân dân",
              },
            ]}
          />

          <CCInput label={"Chứng minh nhân dân"} name={[...BASE_FORM, "origin_person", "doc_code"]} />

          <CCInput type="date" name={[...BASE_FORM, "origin_person", "doc_time_provide"]} label="Ngày cấp" />

          <CCInput name={[...BASE_FORM, "origin_person", "doc_place_provide"]} label="Nơi cấp" />

          <CCInput label="Số điện thoại" name={[...BASE_FORM, "origin_person", "contact", "phone"]} />

          <Form.Item name={[...BASE_FORM, "company_value"]} label="Giá trị góp vốn">
            <InputNumber formatter={(val) => `${number_format(val)}`} style={{ width: "100%" }} />
          </Form.Item>
        </div>
      );
    }
    return xhtml;
  };
  return (
    <Form.Item
      label={<h3>Thành viên góp vốn</h3>}
      className={clsx([
        styles.hide,
        {
          [styles.visible]: current === 2,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <CCInput
            type="select"
            label="Người đại diện"
            name={[...BASE_FORM, "present_person"]}
            onSelect={(e) => setPresent(e)}
            // defaultValue="personal"
            defaultActiveFirstOption
            // placeholder="Chọn người đại diện"
            options={[
              { value: "personal", name: "Người đại diện là cá nhân" },
              { value: "organization", name: "Người đại diện là tổ chức" },
            ]}
          />
        </Col>
        <Col span={24}>{renderPresentPerson()}</Col>
      </Row>
    </Form.Item>
  );
});

export default ThanhVienGopVon;
