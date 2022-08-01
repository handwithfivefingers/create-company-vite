import { message, Skeleton, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import CardCategory from '../../../components/CardCategory';
// import { useGetProvince } from '../../../helper/Hook';
import CategoryService from '../../../service/UserService/CategoriesService';


import styles from './styles.module.scss';

const { Paragraph } = Typography;

const UserProductPage = () => {
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState([]);


	useEffect(() => {
		getScreenData();
	
	}, []);

	const getScreenData = async () => {
		try {
			setLoading(true);
			let res = await CategoryService.getCategories();
			const { status, data } = res.data;

			if (status === 200) {
				setProduct(data);
			} else message.error(res.data.message);
		} catch (e) {
			message.error(res.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.cardgrid}>
			<Skeleton active loading={loading}>
				{product?.map((item) => {
					return <CardCategory data={item} key={item._id} />;
				})}
			</Skeleton>
		</div>
	);
};

export default UserProductPage;
