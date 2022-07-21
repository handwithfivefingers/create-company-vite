import { Form, Select } from 'antd';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import GiaiThe from './GiaiThe';
import styles from './styles.module.scss';

const Dissolution = forwardRef((props, ref) => {
  const [selectType, setSelectType] = useState();

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
        <Select
          onSelect={(val, opt) => handleChange(val, opt, 'selectProduct')}
          placeholder="Chọn loại hình doanh nghiệp"
        >
          {props.data?.map((item) => {
            return (
              <Select.Option key={item._id} value={item._id} {...item}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <GiaiThe current={props.current} index={1} ref={ref} data={selectType} />
    </Form>
  );
});

export default Dissolution;
