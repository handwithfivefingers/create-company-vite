import { Form, Select } from 'antd';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import styles from './styles.module.scss';
import TamNgungKinhDoanh from './TamNgungKinhDoanh';
const TamHoanForm = forwardRef((props, ref) => {
  const [selectType, setSelectType] = useState();

  // const renderFormByType = (type) => {
  //   let xhtml = null;
  //   if (type === "1") {
  //     xhtml = <TamNgungKinhDoanh ref={ref} current={props.current} index={1} />;
  //   }
  //   if (type === "2") xhtml = <KinhDoanhLaiTruocThoiHan ref={ref} current={props.current} index={1} />;
  //   return xhtml;
  // };

  const handleChange = (val, opt, pathName) => {
    setSelectType(opt);
    ref.current.setFields([
      {
        name: [pathName],
        value: opt,
      },
    ]);
    if (props.onFinishScreen) {
      props.onFinishScreen(opt);
    }
  };

  return (
    <Form ref={ref} layout="vertical">
      <Form.Item
        name="selectProduct"
        label="Chọn loại hình doanh nghiệp"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select onSelect={(val, opt) => handleChange(val, opt, 'selectProduct')} placeholder="Bấm vào đây">
          {props.data?.map((item) => {
            return (
              <Select.Option key={item._id} value={item._id} {...item}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <TamNgungKinhDoanh ref={ref} current={props.current} index={1} data={selectType} />
    </Form>
  );
});

export default TamHoanForm;
