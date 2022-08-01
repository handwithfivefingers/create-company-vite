import React, { forwardRef, useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Select } from 'antd';
import { makeid } from '@/helper/Common';
import styles from './styles.module.scss';
const { RangePicker } = DatePicker;

const CCInput = forwardRef((props, ref) => {
	const { name, label, value, onChange, style, placeholder, defaultValue, ...rest } = props;
	const [optional, setOptional] = useState([]);

	const handleOptions = () => {
		let option;
		if (typeof props?.options !== 'object') {
			// function
			option = props?.options();
		} else {
			option = props?.options;
		}
		setOptional(option);
	};

	switch (props.type) {
		case 'text':
			return (
				<Form.Item value={value} name={name} label={label || ' '} key={props?.key}>
					<Input
						size='large'
						onChange={props?.onChange}
						style={style}
						placeholder={placeholder}
						disabled={props?.disabled}
						autoComplete='off'
						value={props?.value}
					/>
				</Form.Item>
			);
		case 'number':
			return (
				<Form.Item value={props?.value} name={props.name} label={props?.label || ' '} key={props?.key}>
					<InputNumber
						size='large'
						onChange={props?.onChange}
						style={props.style}
						formatter={props?.formatter}
						placeholder={props?.placeholder}
						{...rest}
						autoComplete='off'
					/>
				</Form.Item>
			);
		case 'date':
			if (props?.layout === 'horizontal') {
				return (
					<div className={styles.formHorizontal}>
						<div className={styles.formTitle}>{props?.label || ' '}</div>
						<Form.Item name={props.name} key={props?.key} layout={props?.layout}>
							<DatePicker
								size='large'
								style={{ ...props.style, width: '100%' }}
								format='DD/MM/YYYY'
								placeholder={props?.placeholder}
								autoComplete={props?.autocomplete || 'off'}
								inputReadOnly={props?.inputReadOnly || true}
								onChange={props?.onChange}
								{...rest}
							/>
						</Form.Item>
					</div>
				);
			} else {
				return (
					<Form.Item name={props.name} label={props?.label || ' '} key={props?.key}>
						<DatePicker
							size='large'
							style={{ ...props.style, width: '100%' }}
							format='DD/MM/YYYY'
							placeholder={props?.placeholder}
							autoComplete={props?.autocomplete || 'off'}
							inputReadOnly={props?.inputReadOnly || true}
							onChange={props?.onChange}
							{...rest}
						/>
					</Form.Item>
				);
			}
		case 'date-range':
			return (
				<>
					<Form.Item name={props?.name} style={{ display: 'none' }} key={props?.key}>
						<RangePicker size='large' inputReadOnly format='MM/DD/YYYY' />
					</Form.Item>

					<Form.Item name={makeid(9)} label={props?.label || ' '} key={props?.key}>
						<RangePicker
							size='large'
							inputReadOnly={props?.inputReadOnly || true}
							onChange={props?.onChange}
							format='MM/DD/YYYY'
							style={{ ...props.style, width: '100%' }}
							placeholder={placeholder}
							autoComplete={props?.autocomplete || 'off'}
							separator={props?.separator}
							{...rest}
						/>
					</Form.Item>
				</>
			);
		case 'select':
			let option;
			if (props?.onDropdownVisibleChange) {
				option = props.options();
			}
			return (
				<Form.Item name={name} label={label || ' '}>
					<Select
						size='large'
						onSelect={props?.onSelect}
						onChange={props?.onChange}
						disabled={props?.disabled}
						defaultValue={props?.defaultValue || null}
						defaultActiveFirstOption={props?.defaultActiveFirstOption}
						onDropdownVisibleChange={handleOptions}
						style={props?.style}
						placeholder={props?.placeholder}
						autoComplete='off'
					>
						{optional?.map((item, i) => {
							return (
								<Select.Option value={item.value} key={item.key ? item.key : [name, i, item.value]}>
									{item.name}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
			);
		default:
			if (props?.layout === 'horizontal') {
				return (
					<div className={styles.formHorizontal}>
						<div className={styles.formTitle}>{props?.label || ' '}</div>
						<Form.Item value={value} name={name} key={props?.key}>
							<Input
								size='large'
								onChange={props?.onChange}
								style={style}
								placeholder={placeholder}
								disabled={props?.disabled}
								autoComplete={props?.autocomplete || 'off'}
							/>
						</Form.Item>
					</div>
				);
			} else {
				return (
					<Form.Item value={value} label={label || ' '} name={name} key={props?.key}>
						<Input
							size='large'
							onChange={props?.onChange}
							style={style}
							placeholder={placeholder}
							disabled={props?.disabled}
							autoComplete={props?.autocomplete || 'off'}
						/>
					</Form.Item>
				);
			}
	}
});

export default CCInput;
