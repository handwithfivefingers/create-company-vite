import { forwardRef, useEffect } from "react";
import { Form } from "antd";
import CCInput from "../../CCInput";
import clsx from "clsx";
import styles from "./styles.module.scss";
const BASE_FORM = ["uy_quyen", "approve"];
const UyQuyen = forwardRef((props, ref) => {
  useEffect(() => {
    ref.current.setFieldsValue({
      uy_quyen: {
        approve: {
          national: "Việt Nam",
        },
      },
    });
  }, [ref]);
  return (
    <Form
      ref={ref}
      layout="vertical"
      initialValues={{
        national: "Việt Nam",
      }}
      className={clsx([
        styles.current,
        {
          [styles.active]: props.current ? true : false,
        },
      ])}
    >
      <CCInput name={[...BASE_FORM, "name"]} label={"Họ và tên bên uỷ quyền (bên A)"} />
      <CCInput type="date" name={[...BASE_FORM, "birth_day"]} label={"Ngày tháng năm sinh"} />
      <CCInput name={[...BASE_FORM, "per_type"]} label={"Dân tộc"} />
      <CCInput name={[...BASE_FORM, "national"]} label={"Quốc tịch"} />
      <CCInput name={[...BASE_FORM, "doc_code"]} label={"CMND/CCCD/Hộ chiếu số"} />
      <CCInput type="date" name={[...BASE_FORM, "doc_time_provide"]} label={"Cấp ngày"} />
      <CCInput name={[...BASE_FORM, "doc_place_provide"]} label={"Nơi cấp"} />
      <CCInput name={[...BASE_FORM, "reg_address"]} label={"Nơi đăng ký hộ khẩu thường trú"} />
    </Form>
  );
});

export default UyQuyen;
