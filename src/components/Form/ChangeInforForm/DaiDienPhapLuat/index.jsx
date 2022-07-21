import { Button, Form } from "antd";
import clsx from "clsx";
import React, { forwardRef, useEffect } from "react";
import CCInput from "@/components/CCInput";
import { SELECT } from "@/contants/Common";
import styles from "./styles.module.scss";

const BASE_FORM = ["change_info", "legal_representative"];

const DaiDienPhapLuat = forwardRef((props, ref) => {
  // console.log(props);
  useEffect(() => {
    ref.current.setFieldsValue({
      change_info: {
        legal_representative: {
          national: "Việt Nam",
        },
      },
    });
    // }
  }, [ref]);

  const handleFill = () => {
    if (!ref) return;
    let val = ref.current.getFieldsValue();
    let { reg_address, town, district, city } = val.change_info.legal_representative;

    ref.current.setFieldsValue({
      change_info: {
        legal_representative: {
          contact_reg_address: reg_address,
          contact_town: town,
          contact_district: district,
          contact_city: city,
        },
      },
    });
  };

  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi người đại diện theo pháp luật</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <CCInput label="Tên doanh nghiệp" name={[...BASE_FORM, "company_name"]} />

      <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={[...BASE_FORM, "mst"]} /> */}

      <CCInput label="Tên người đại diện pháp luật cũ" name={[...BASE_FORM, "old_name"]} />

      <CCInput type="select" name={[...BASE_FORM, "old_title"]} label="Chức danh" options={SELECT.TITLE} />

      <Form.Item label="Thông tin người đại diện theo pháp luật sau khi thay đổi">
        <CCInput label="Họ và tên" name={[...BASE_FORM, "new_name"]} />

        <CCInput type="select" name={[...BASE_FORM, "gender"]} label="Giới tính" options={SELECT.GENDER} />

        <CCInput type="select" name={[...BASE_FORM, "new_title"]} label="Chức danh" options={SELECT.TITLE} />

        <CCInput name={[...BASE_FORM, "birth_day"]} label="Sinh ngày" type="date"  />

        <CCInput name={[...BASE_FORM, "per_type"]} label="Dân tộc" />

        <CCInput name={[...BASE_FORM, "national"]} label="Quốc tịch" />

        <CCInput
          type="select"
          name={[...BASE_FORM, "doc_type"]}
          label="Loại giấy tờ pháp lý"
          options={SELECT.DOC_TYPE}
        />

        <CCInput name={[...BASE_FORM, "doc_code"]} label="Số CMND/ CCCD/ Hộ chiếu" />

        <CCInput name={[...BASE_FORM, "doc_time_provide"]} label="Ngày cấp" type="date" />

        <CCInput name={[...BASE_FORM, "doc_place_provide"]} label="Nơi cấp" />

        <Form.Item label="Địa chỉ thường trú">
          <CCInput name={[...BASE_FORM, "reg_address"]} label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn" />
          <CCInput name={[...BASE_FORM, "town"]} label="Xã/Phường/Thị Trấn" />
          <CCInput name={[...BASE_FORM, "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh" />
          <CCInput name={[...BASE_FORM, "city"]} label="Tỉnh/Thành phố" />
        </Form.Item>
        <Form.Item label="Địa chỉ liên lạc">
          <Button onClick={handleFill}>Tự động điền</Button>
          <CCInput
            name={[...BASE_FORM, "contact_reg_address"]}
            label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
          />
          <CCInput name={[...BASE_FORM, "contact_town"]} label="Xã/Phường/Thị Trấn" />
          <CCInput name={[...BASE_FORM, "contact_district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh" />
          <CCInput name={[...BASE_FORM, "contact_city"]} label="Tỉnh/Thành phố" />
        </Form.Item>
      </Form.Item>
    </Form.Item>
  );
});

export default DaiDienPhapLuat;
