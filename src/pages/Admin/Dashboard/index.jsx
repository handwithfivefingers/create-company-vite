import VirtualScroll from '@/components/VirtualScroll';
import AdminDashboardService from '@/service/AdminService/AdminDashboardService';
import { Avatar, Card, Col, List, message, Row, Skeleton, Tabs } from 'antd';
import clsx from 'clsx';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { GrStatusWarning } from 'react-icons/gr';
import styles from './styles.module.scss';
import { makeid } from '@/helper/Common';
const { TabPane } = Tabs;
const AdminDashboard = () => {
	const [logs, setLogs] = useState([]);
	const [orderPayment, setOrderPayment] = useState([]);
	const [orderLatest, setOrderLatest] = useState([]);

	const [data, setData] = useState([]);
	const [output, setOutput] = useState([]);
	const [containerHeight, setContainerHeight] = useState(100);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getScreenData();
		layoutEffection();
	}, []);

	const layoutEffection = () => {
		let siteLayout = document.querySelector('.site-layout-background');

		let { height } = siteLayout.getBoundingClientRect();

		setContainerHeight(height - 156);
	};
	const getScreenData = async () => {
		try {
			setLoading(true);
			let { data } = await AdminDashboardService.getLogs();

			let { _logs, output, error } = data.data;

			setLogs((state) => ({
				...state,
				_logs,
				output,
				error,
			}));
			// setData(_logs.slice(0, 20));
			setData(_logs);
			setOutput(output.slice(0, 20));
		} catch (err) {
			let msg = 'Đã có lỗi xảy ra, vui lòng thử lại sau';
			message.error(msg);
		} finally {
			setLoading(false);
		}
	};

	// const testPayment = () => {
	//   const date = new Date();
	//   var createDate = Date.parse(date).toString('yyyyMMddHHmmss');
	//   var orderId = Date.parse(date).toString('HHmmss');
	//   let params = {};
	//   params.createDate = createDate;
	//   params.orderId = orderId;
	//   params.amount = 100000 * 100;
	//   params.orderInfo = '6298edcfe6214c530533b255';
	//   AdminDashboardService.testPayment(params)
	//     .then((res) => {
	//       if (res.data.status === 200) {
	//         return (window.location.href = res.data.url);
	//       }
	//     })
	//     .catch((err) => {
	//       console.log(err);
	//     });
	// };
	// const ContainerHeight = 400;

	const onScroll = (e, type) => {
		if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === containerHeight) {
			if (type === 1) appendData();
			else if (type === 2) appendOutputData();
		}
	};
	const appendData = () => {
		let length = data.length;
		let newData = data;
		newData = [...newData, ...logs._logs?.slice(length, length + 20)];
		setData(newData);
	};

	const appendOutputData = () => {
		let length = output.length;
		let newData = output;
		newData = [...newData, ...logs.output?.slice(length, length + 20)];
		setOutput(newData);
	};
	// console.log(data);
	return (
		<Row gutter={[16, 12]}>
			<Col span={16}>
				<Card title='Logs hệ thống'>
					<Tabs
						// onTabClick={onTabClick}
						defaultActiveKey='1'
						destroyInactiveTabPane
						className={clsx([styles.tabs, 'cc-card'])}
						animated={{ inkBar: true, tabPane: true }}
					>
						<TabPane tab='Truy cập' key='1'>
							{/* <List
                className={clsx([styles.list, 'demo-loadmore-list'])}
                loading={loading}
                itemLayout="horizontal"
                dataSource={logs._logs}
                renderItem={(item) => (
                  <List.Item actions={[]} className={clsx([styles.listItem])}>
                    <Skeleton avatar title={false} loading={loading} active>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            className={clsx([styles.ava])}
                            size={{ xs: 12, sm: 18, md: 24, lg: 30, xl: 36, xxl: 42 }}
                            icon={<GrStatusWarning />}
                          />
                        }
                        title={new Date(item?.createdAt).toString('dd/MM/yyyy HH:mm')}
                        description={<span style={{ wordBreak: 'break-word' }}>{JSON.stringify(item.error)}</span>}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              /> */}
							{/* <List loading={loading}>
                <VirtualList
                  data={data}
                  height={containerHeight}
                  itemHeight={50}
                  itemKey="Truy cập"
                  onScroll={(e) => onScroll(e, 1)}
                >
                  {(item, i) => (
                    <List.Item key={`Truy cập ${i}`}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            className={clsx([styles.ava])}
                            size={{ xs: 12, sm: 18, md: 24, lg: 30, xl: 36, xxl: 42 }}
                            icon={<GrStatusWarning />}
                          />
                        }
                        title={new Date(item?.createdAt).toString('dd/MM/yyyy HH:mm')}
                        description={
                          <span style={{ wordBreak: 'break-word' }}>
                            <pre style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                              {JSON.stringify(item.error, undefined, 1)}
                            </pre>
                          </span>
                        }
                      />
                    </List.Item>
                  )}
                </VirtualList>
              </List> */}
							<VirtualScroll data={data} />
						</TabPane>
						<TabPane tab='Hệ thống' key='2'>
							<List loading={loading}>
								<VirtualList
									data={output}
									height={containerHeight}
									itemHeight={50}
									itemKey='Hệ thống'
									onScroll={(e) => onScroll(e, 2)}
								>
									{(item, i) => (
										<List.Item key={i}>
											<List.Item.Meta
												avatar={
													<Avatar
														className={clsx([styles.ava])}
														size={{ xs: 12, sm: 18, md: 24, lg: 30, xl: 36, xxl: 42 }}
														icon={<GrStatusWarning />}
													/>
												}
												title={item?.slice(0, 28)}
												description={
													<span style={{ wordBreak: 'break-word' }}>
														{/* {item?.slice(29)} */}
														<pre style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{item?.slice(29)}</pre>
													</span>
												}
											/>
										</List.Item>
									)}
								</VirtualList>
							</List>
						</TabPane>
					</Tabs>
				</Card>
			</Col>
			<Col span={8}>
				<Row gutter={[16, 12]}>
					<Col span={24}>
						<Card title='Đơn hàng đã thanh toán'>
							{/* <List
								className='demo-loadmore-list'
								// loading={loading}
								itemLayout='horizontal'
								dataSource={orderPayment}
								renderItem={(item) => (
									<List.Item actions={[]}>
										<Skeleton avatar title={false} loading={item.loading} active>
											<List.Item.Meta
												avatar={<Avatar src={item.picture.large} />}
												title={item.name?.last}
												description='Ant Design, a design language for background applications, is refined by Ant UED Team'
											/>
											<div>content</div>
										</Skeleton>
									</List.Item>
								)}
							/> */}
						</Card>
					</Col>
					<Col span={24}>
						<Card title='Đơn hàng vừa tạo'>
							{/* <List
								className='demo-loadmore-list'
								// loading={loading}
								itemLayout='horizontal'
								dataSource={orderLatest}
								renderItem={(item) => (
									<List.Item actions={[]}>
										<Skeleton avatar title={false} loading={item.loading} active>
											<List.Item.Meta
												avatar={<Avatar src={item.picture.large} />}
												title={item.name?.last}
												description='Ant Design, a design language for background applications, is refined by Ant UED Team'
											/>
											<div>content</div>
										</Skeleton>
									</List.Item>
								)}
							/> */}
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default AdminDashboard;
