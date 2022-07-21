import CCPagination from '@/components/CCPagination';
import Tracking from '@/components/Tracking';
import axios from '@/config/axios';
import { makeid, number_format } from '@/helper/Common';
import AdminOrderService from '@/service/AdminService/AdminOrderService';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Modal, Space, Table, Tag, Tooltip } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
const AdminOrder = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [childModal, setChildModal] = useState({
		visible: false,
		component: null,
		width: 0,
	});
	const formRef = useRef();

	const pagiConfig = {
		current: data.current_page,
		pageSize: 10,
		total: data.count,
		onChange: (page, pageSize) => {
			fetchOrders(page);
		},
		showSizeChanger: false,
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async (page) => {
		// page -> number
		try {
			setLoading(true);
			let { company, user } = formRef?.current.getFieldsValue();
			let params = {
				page,
				company,
				user,
			};
			let res = await AdminOrderService.getOrder(params);
			let { data, status } = res.data;
			setData(data);
			if (status !== 200) {
				message.error(res.data.message);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const handlePayment = (record) => {
		console.log(record);
		setLoading(true);
		axios
			.get(`/api/payment/${record._id}`)
			.then((res) => {
				if (res.data.status === 200) {
					window.location.href = res.data.url;
				}
			})
			.catch((err) => console.log(err))
			.finally(setLoading(false));
	};

	const onHandleDelete = (record) => {
		// console.log("delete", record);
		Modal.confirm({
			title: 'Xác thực',
			content: 'Bạn có muốn xóa ?',
			async onOk() {
				return await handleDeleteOrder(record._id);
			},
		});
	};

	const handleDeleteOrder = async (id) => {
		try {
			let res = await AdminOrderService.deleteOrder(id);
			if (res.data.status === 200) {
				message.success(res.data.message);
			} else {
				message.error(res.data.message);
			}
		} catch (err) {
			console.log(err);
		} finally {
			let { current_page } = data;
			fetchOrders(current_page);
		}
	};

	const onFilter = (val) => {
		let { current_page } = data;
		fetchOrders(current_page);
	};

	const checkProgress = (record) => {
		setChildModal({
			visible: true,
			width: '100%',
			component: (
				<Tracking
					data={record}
					onFinishScreen={(attachments, content, email) => {
						handleSendMailWithAttach(attachments, content, email);
						onClose();
					}}
				/>
			),
		});
	};

	const handleSendMailWithAttach = async (attachments, content, email) => {
		try {
			setLoading(true);

			const form = new FormData();

			attachments?.fileList?.map((item) => {
				form.append('attachments', item.originFileObj);
			});

			form.append('content', content);

			form.append('email', email);

			let res = await axios.post('/api/sendmail', form);

			let msg = res.data.message;

			message.success(`${msg} -> Email: ${[res.data.info.accepted].join('')}`);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const onClose = useCallback(() => {
		setChildModal({
			...childModal,
			visible: false,
		});
	}, [childModal]);

	const renderAction = (record) => {
		let xhtml = null;

		xhtml = (
			<Space>
				<Button>
					<Link to={`/admin/order/${record?._id}`}>
						<FormOutlined />
					</Link>
				</Button>
				<Button onClick={() => onHandleDelete(record)} icon={<DeleteOutlined />} />
			</Space>
		);
		return xhtml;
	};

	const renderDate = (record) => {
		// console.log(
		//   Date.parse(record?.createdAt).toLocaleDateString('ja-JA', {
		//     weekday: 'narrow',
		//     year: 'numeric',
		//     month: 'long',
		//     day: 'numeric',
		//   })
		// );
		// let result = new Date.parse(record?.createdAt).toLocaleDateString('vi-Vi', {
		// 	weekday: 'long',
		// 	year: 'numeric',
		// 	month: 'long',
		// 	day: 'numeric',
		// });
		let result = moment(record.createdAt).format('YYYY-MM-DD');
		return result;
	};

	const renderTag = (record) => {
		return record?.payment === 1 ? <Tag key={makeid(9)} color='green'>Đã thanh toán</Tag> : <Tag key={makeid(9)}  color='volcano'>Chưa thanh toán</Tag>;
	};

	const renderProgress = (record) => {
		return (
			<Tooltip
				title={
					<>
						Step: {record?.track.step} <br />
						Status: {record?.track.status}
					</>
				}
			>
				<Button type='text' onClick={() => checkProgress(record)}>
					{record?.track.step}
				</Button>
			</Tooltip>
		);
	};

	const renderProduct = (val, record, i) => {
		return (
			<div key={[val, i]} style={{ display: 'flex', justifyContent: 'flex-start' }}>
				<Space wrap size={[8, 16]} align='start'>
					{record?.products.map((item) => (
						<Tag color='#108ee9' key={makeid(9)}>
							{item.name}
						</Tag>
					))}
				</Space>
			</div>
		);
	};
	console.log('renderProduct');
	return (
		<>
			<Card
				className='cc-card'
				title='Quản lý đơn hàng'
				extra={[
					<Form key='filter' ref={formRef} onFinish={onFilter}>
						<div className={styles.searchForm}>
							<Form.Item name='company'>
								<Input placeholder='Tên công ty' />
							</Form.Item>
							<Form.Item name='user'>
								<Input placeholder='Người dùng' />
							</Form.Item>
							<Form.Item>
								<Button htmlType='submit'>Tìm kiếm</Button>
							</Form.Item>
						</div>
					</Form>,
				]}
			>
				<Table
					dataSource={data._order}
					// loading={loading}
					loading={{
						spinning: loading,
						tip: 'Loading...',
						delay: 100,
					}}
					size='small'
					bordered
					className='table'
					pagination={false}
					rowKey={(record) => record._id || makeid(9)}
					scroll={{ x: 1280 }}
					sticky={{ offsetHeader: 50 }}
				>
					<Table.Column title='Đơn hàng' width='100px' render={(val, record, i) => record?.name} />
					<Table.Column title='Người đăng kí' render={(val, record, i) => record?.orderOwner.email} />
					<Table.Column width='375px' title='Sản phẩm' render={(val, record, i) => renderProduct(val, record, i)} />
					<Table.Column title='Giá tiền' render={(val, record, i) => <>{number_format(record?.price)} VND</>} />
					<Table.Column title='Tiến độ' width='75px' render={(val, record, i) => renderProgress(record)} />
					<Table.Column title='Thanh toán' render={(val, record, i) => renderTag(record)} />
					<Table.Column title='Ngày tạo' width='200px' render={(val, record, i) => renderDate(record)} />
					<Table.Column title='Thao tác' render={(val, record, i) => renderAction(record)} />
				</Table>
			</Card>
			<CCPagination {...pagiConfig} />

			<Modal footer={null} onCancel={() => onClose()} visible={childModal.visible} width={childModal.width}>
				{childModal.component}
			</Modal>
		</>
	);
};

export default AdminOrder;
