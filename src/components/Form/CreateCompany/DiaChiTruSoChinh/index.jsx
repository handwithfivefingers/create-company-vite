import { Form } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import CCInput from "@/components/CCInput";
import styles from "../CreateCompany.module.scss";

const DiaChiTruSoChinh = forwardRef((props, ref) => {
  const { BASE_FORM, current } = props;

  return (
    <Form.Item
      label={<h2>Địa chỉ đặt trụ sở</h2>}
      className={clsx([
        styles.hide,
        {
          [styles.visible]: current === 6,
        },
      ])}
    >
      <Form.Item label="Địa chỉ trụ sở chính">
        <CCInput
          name={[...BASE_FORM, "core", "address", "street"]}
          label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
        />
        <CCInput name={[...BASE_FORM, "core", "address", "town"]} label="Xã/Phường/Thị trấn" />
        <CCInput name={[...BASE_FORM, "core", "address", "district"]} label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh" />
        <CCInput name={[...BASE_FORM, "core", "address", "city"]} label="Tỉnh/Thành phố" />
      </Form.Item>

      {/* <CCInput name={[...BASE_FORM, "core", "address_opt_1"]} label="Địa chỉ chi nhánh (nếu có)" /> */}

      {/* <CCInput name={[...BASE_FORM, "core", "address_opt_2"]} label="Địa chỉ văn phòng đại diện (nếu có)" /> */}
    </Form.Item>
  );
});

export default DiaChiTruSoChinh;
