import { Form, Select } from "antd";
import clsx from "clsx";
import React, { forwardRef, useEffect, useState } from "react";
import CCInput from "@/components/CCInput";
import GlobalService from "@/service/GlobalService";
import styles from "../DaiDienPhapLuat/styles.module.scss";

const BASE_FORM = ["change_info", "company_career"];

const NganhNgheKinhDoanh = forwardRef((props, ref) => {
  const [career, setCareer] = useState([]);

  useEffect(() => {
    onFetchCareer();
  }, []);

  const onFetchCareer = async () => {
    try {
      const res = await GlobalService.fetchCareer();
      if (res) {
        setCareer(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (value, opt, pathName) => {
    // let val = formRef.current.getFieldsValue();
    ref.current.setFieldsValue({
      change_info: {
        company_career: {
          [pathName]: opt,
        },
      },
    });
  };
  return (
    <Form.Item
      label={<h3>Thông báo thay đổi ngành, nghề kinh doanh</h3>}
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <CCInput label="Tên doanh nghiệp" name={[...BASE_FORM, "company_name"]} />

      <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={[...BASE_FORM, "mst"]} /> */}

      <Form.Item
        label="Bổ sung ngành, nghề kinh doanh"
        name={[...BASE_FORM, "include"]}
        
      >
        <Select
          showSearch
          placeholder="Gõ tên ngành hoặc mã ngành"
          allowClear
          mode="multiple"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val, opt) => handleChange(val, opt, "include")}
        >
          {career.map((item) => (
            <Select.Option key={item._id} value={item._id} name={item.name}>
              {item.code}-{item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Bỏ ngành, nghề kinh doanh"
        name={[...BASE_FORM, "exclude"]}
        placeholder="Gõ tên ngành hoặc mã ngành"
      >
        <Select
          showSearch
          placeholder="Gõ tên ngành hoặc mã ngành"
          allowClear
          mode="multiple"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val, opt) => handleChange(val, opt, "exclude")}
        >
          {career.map((item) => (
            <Select.Option key={item._id} value={item._id} name={item.name}>
              {item.code}-{item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item
        label="Sửa đổi chi tiết ngành, nghề kinh doanh sau"
        name={[...BASE_FORM, "detail_after"]}
        
      >
        <Select
          showSearch
          placeholder="Gõ tên ngành hoặc mã ngành"
          allowClear
          mode="multiple"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val, opt) => handleChange(val, opt, "detail_after")}
        >
          {career.map((item) => (
            <Select.Option key={item._id} value={item._id} name={item.name}>
              {item.code}-{item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}

      {/* <CCInput 
      // label="Tên người Đại diện pháp luật" 
      label={
        <div
          dangerouslySetInnerHTML={{
            __html: '</>Tên người Đại diện pháp luật</>',
          }}
        />
      }
      name={[...BASE_FORM, "legal_person"]} 
      placeholder="NGUYỄN VĂN A"
      />
       */}
    </Form.Item>
  );
});

export default NganhNgheKinhDoanh;
