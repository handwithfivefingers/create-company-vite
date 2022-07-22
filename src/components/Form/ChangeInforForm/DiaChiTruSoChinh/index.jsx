import { Form } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import CCInput from "@/components/CCInput";
import { SELECT } from "@/constant/Common";
import styles from "../DaiDienPhapLuat/styles.module.scss";

const BASE_FORM = ["change_info", "location"];
const DiaChiTruSoChinh = forwardRef((props, ref) => {
  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi địa chỉ trụ sở chính</h4>}
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <CCInput label="Tên doanh nghiệp" name={[...BASE_FORM, "company_name"]} />

      <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={[...BASE_FORM, "mst"]} /> */}

      <Form.Item label={<h4>Địa chỉ trụ sở hiện tại</h4>}>
        <CCInput name={[...BASE_FORM, "old", "address"]} label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn" />
        <CCInput name={[...BASE_FORM, "old", "town"]} label="Xã/Phường/Thị Trấn" />
        <CCInput name={[...BASE_FORM, "old", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh" />
        <CCInput name={[...BASE_FORM, "old", "city"]} label="Tỉnh/Thành phố" />
      </Form.Item>

      <Form.Item name={[...BASE_FORM, "new_location"]} label={<h4>Địa chỉ trụ sở sau khi thay đổi</h4>}>
        <CCInput
          name={[...BASE_FORM, "new_location", "address"]}
          label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
        />
        <CCInput name={[...BASE_FORM, "new_location", "town"]} label="Xã/Phường/Thị Trấn" />
        <CCInput name={[...BASE_FORM, "new_location", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh" />
        <CCInput name={[...BASE_FORM, "new_location", "city"]} label="Tỉnh/Thành phố" />
      </Form.Item>

      <CCInput name={[...BASE_FORM, "phone"]} label="Điện thoại" />

      <CCInput
        type="select"
        name={[...BASE_FORM, "inside"]}
        label="Doanh nghiệp nằm trong"
        options={SELECT.BUSINESS_LOCATION}
      />

      <CCInput name={[...BASE_FORM, "legal_person"]} label="Tên người đại diện pháp luật" />
      {/* </Form> */}
    </Form.Item>
  );
});

export default DiaChiTruSoChinh;
