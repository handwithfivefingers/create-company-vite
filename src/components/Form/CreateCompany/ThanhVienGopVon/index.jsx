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
          {/* <CCInput name={[...BASE_FORM, "origin_person", "name"]} label={FormFieldText["origin_person"]} /> */}
          <CCInput
            name={[...BASE_FORM, "origin_person", "name"]}
            label="Họ và Tên"
            placeholder="NGUYỄN VĂN A"
          />

          <CCInput type="date" name={[...BASE_FORM, "origin_person", "birth_day"]} label="Ngày sinh" placeholder="Chọn ngày" />

          <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "gender"]}
            label="Giới tính"
            options={SELECT.GENDER}
            placeholder="Bấm chọn"
          />

          <CCInput name={[...BASE_FORM, "origin_person", "per_type"]} label="Dân tộc" />

          {/* <CCInput name={[...BASE_FORM, "origin_person", "national"]} label="Quốc tịch" /> */}

          {/* <CCInput name={[...BASE_FORM, "origin_person", "reg_address"]} label="Nơi đăng kí hộ khẩu thường trú" /> */}

          {/* <CCInput name={[...BASE_FORM, "origin_person", "current_address"]} label="Chỗ ở hiện tại" /> */}

          <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "doc_type"]}
            label="Loại giấy tờ"
            defaultValue="Chứng minh nhân dân"
            options={SELECT.DOC_TYPE}
          />

          <CCInput label={"Số CMND/ CCCD/ Hộ chiếu"} name={[...BASE_FORM, "origin_person", "doc_code"]} placeholder="0010829446357" />

          <CCInput type="date" name={[...BASE_FORM, "origin_person", "doc_time_provide"]} label="Ngày cấp" placeholder="Chọn ngày" />

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

          {/* <CCInput label="Số điện thoại" name={[...BASE_FORM, "origin_person", "contact", "phone"]} /> */}

          {/* <Form.Item name={[...BASE_FORM, "company_value"]} label="Giá trị góp vốn">
            <InputNumber formatter={(val) => `${number_format(val)}`} style={{ width: "100%" }} />
          </Form.Item> */}
        </div>
      );
    } else if (present === "organization") {
      xhtml = (
        <div className={styles.groupInput}>
          {/* START Nhập thông tin của tổ chức */}
          <CCInput label={"Tên tổ chức"} name={[...BASE_FORM, "origin_person", "organization_name"]} placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B" />
          <CCInput label="Nhập mã số doanh nghiệp hoặc Mã số thuế" name={[...BASE_FORM, 'mst']} placeholder="0316184427" />
          <CCInput type="date" name={[...BASE_FORM, "organization_name", "doc_time_provide"]}
            label={
              <div dangerouslySetInnerHTML={{ __html: '</>Ngày cấp <i>(ngày đăng ký lần đầu)</i></>' }} />
            }
            placeholder="Chọn ngày"
          />
          <CCInput name={[...BASE_FORM, "organization_name", "doc_place_provide"]} label="Nơi cấp" placeholder="Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh – Phòng đăng ký kinh doanh" />

          <Form.Item label="Địa chỉ trụ sở chính" className={styles.newLine}>
            <CCInput
              name={[...BASE_FORM, "organization_name", "company", "address"]}
              label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
            />

            <CCInput name={[...BASE_FORM, "organization_name", "company", "town"]} label="Xã/Phường/Thị trấn" />

            <CCInput
              name={[...BASE_FORM, "organization_name", "company", "district"]}
              label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
            />

            <CCInput name={[...BASE_FORM, "organization_name", "company", "city"]} label="Tỉnh/Thành phố" />


            {/* <CCInput name={[...BASE_FORM, "organization_name", "company", "national"]} label="Quốc gia" /> */}

          {/* END thông tin của tổ chức */}
          </Form.Item>

          {/* START Nhập thông tin của người ĐDPL (của tổ chức trên) */}
          <CCInput
            name={[...BASE_FORM, "origin_person", "name"]}
            label={
              <div dangerouslySetInnerHTML={{ __html: '</>Họ và Tên người đại diện theo pháp luật <i>(ĐDPL)</i></>' }} />
            }
            placeholder="NGUYỄN VĂN A"
          />

          <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "title"]}
            label={
              <div dangerouslySetInnerHTML={{ __html: '</>Chức danh <i>(ĐDPL)</i></>' }} />
            }

            options={SELECT.TITLE}
          />

          {/* <CCInput type="date" name={[...BASE_FORM, "origin_person", "birth_day"]} label="Ngày sinh" /> */}

          {/* <CCInput
            type="select"
            name={[...BASE_FORM, "origin_person", "gender"]}
            label="Giới tính"
            options={SELECT.GENDER}
          /> */}

          {/* <CCInput name={[...BASE_FORM, "origin_person", "per_type"]} label="Dân tộc" /> */}

          {/* <CCInput name={[...BASE_FORM, "origin_person", "national"]} label="Quốc tịch" /> */}

          <Form.Item
            name={[...BASE_FORM, "origin_person", "title"]}
            label={
              <div dangerouslySetInnerHTML={{ __html: '</>Địa chỉ thường trú <i>(ĐDPL)</i></>' }} />
            }
          >
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

          <Form.Item
            label={
              <div dangerouslySetInnerHTML={{ __html: '</>Địa chỉ liên lạc <i>(ĐDPL)</i></>' }} />
            }
          >
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

            name={[...BASE_FORM, "present_person"]}
            onSelect={(e) => setPresent(e)}
            // defaultValue="personal"
            defaultActiveFirstOption
            placeholder="Bấm vào đây"
            options={[
              { value: "personal", name: "Thành viên góp vốn là cá nhân" },
              { value: "organization", name: "Thành viên góp vốn là tổ chức" },
            ]}
          />
        </Col>
        <Col span={24}>{renderPresentPerson()}</Col>
      </Row>
    </Form.Item>
  );
});

export default ThanhVienGopVon;
