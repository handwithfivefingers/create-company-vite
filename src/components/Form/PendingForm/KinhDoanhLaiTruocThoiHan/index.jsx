import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Space } from "antd";
import clsx from "clsx";
import React, { forwardRef, useState } from "react";
import CCInput from "@/components/CCInput";
import { SELECT } from "@/constant/Common";
import styles from "./../styles.module.scss";

const BASE_FORM = ["pending", "cancel"]; 

const KinhDoanhLaiTruocThoiHan = forwardRef((props, ref) => {
  //   Nếu chọn “Toàn bộ công ty”, thỉ chỉ cần 2 field này (đang nằm cuối trang)
  // Đăng ký tiếp tục kinh doanh kể từ ngày/tháng/năm
  // Lý do tiếp tục kinh doanh
  const [objective, setObjective] = useState("");

  const handleChange = (val) => {
    setObjective(val);
  };

  const handleDateChange = (date, dateString) => {
    ref.current.setFieldsValue({
      pending: {
        cancel: {
          time_range: {
            start: dateString?.[0],
            end: dateString?.[1],
          },
        },
      },
    });
  };
  return (
    <Form.Item
      label={<h4>Đăng ký kinh doanh lại trước thời hạn</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <CCInput name={[...BASE_FORM, "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)" />

      <CCInput name={[...BASE_FORM, "mst"]} label="Mã số doanh nghiệp/Mã số thuế" />

      <CCInput name={[...BASE_FORM, "opt_code"]} label="Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)" />

      <CCInput name={[...BASE_FORM, "time_provide"]} label="Ngày cấp" type="date" />

      <CCInput name={[...BASE_FORM, "place_provide"]} label="Nơi cấp" />


      <CCInput
        type="select"
        name={[...BASE_FORM, "obj"]}
        onChange={handleChange}
        label="Đối tượng kinh doanh lại trước thời hạn"
        options={SELECT.BUSINESS_OBJECT}
      />
      {objective === "Toàn bộ công ty" ? (
        ""
      ) : (
        <Row gutter={[12, 16]}>
          <ChiNhanh />
        </Row>
      )}

      <CCInput
        type="date"
        name={[...BASE_FORM, "time_range"]}
        label="Đăng ký tiếp tục kinh doanh kể từ ngày/tháng/năm"
        onChange={handleDateChange}
        inputReadOnly={false}
      />

      <CCInput name={[...BASE_FORM, "reason"]} label="Lý do tiếp tục kinh doanh" />
    </Form.Item>
  );
});
export default KinhDoanhLaiTruocThoiHan;

const ChiNhanh = () => {
  return (
    <>
      <Form.List
        name={[...BASE_FORM, "branch"]}
        initialValue={[
          {
            branch_name: "",
            resp_office: "",
            branch_name_opt: "",
            branch_mst_opt: "",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields?.map((field, i) => (
              <>
                <Col lg={12} md={12} sm={24} xs={24} key={[field, i + 1]}>
                  <CCInput
                    name={[field.name, "branch_name"]}
                    label="Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)"
                  />
                  <CCInput
                    name={[field.name, "resp_office"]}
                    label="Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh"
                  />

                  {/** Group ->>>> */}

                  <Form.Item label="Vui lòng điền thông tin sau đây nếu Địa điểm kinh doanh của bạn trực thuộc chi nhánh">
                    <CCInput name={[field.name, "branch_name_opt"]} label="Tên chi nhánh (nếu có)" />
                    <CCInput
                      name={[field.name, "branch_mst_opt"]}
                      label="Mã số chi nhánh/Mã số thuế của chi nhánh  (nếu có)"
                    />
                  </Form.Item>

                  <Space style={{ display: "flex", justifyContent: "center" }}>
                    {fields.length <= 1 ? "" : <MinusCircleOutlined onClick={() => remove(field.name)} />}
                  </Space>
                </Col>
              </>
            ))}

            {fields.length >= 5 ? (
              ""
            ) : (
              <Form.Item label="">
                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                  Thêm chi nhánh
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
    </>
  );
};
