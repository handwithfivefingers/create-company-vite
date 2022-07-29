import { AuthAction } from '@/store/actions';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProvinceAction } from '@/store/actions';

const useAuth = () => {
	const authReducer = useSelector((state) => state.authReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(AuthAction.AuthUser());
	}, []);

	return authReducer; // status:true false, role: admin user
};

const useDetectLocation = (location) => {
	const [route, setRoute] = useState({
		to: '',
		from: '', //--> previous pathname
	});
	//   const dispatch = useDispatch();
	useEffect(() => {
		setRoute((prev) => ({ to: location.pathname, from: prev.to }));
	}, [location]);

	return route;
};

const useScrollAware = () => {
	const [scrollTop, setScrollTop] = useState(0);
	const ref = useRef();

	const onScroll = (e) =>
		requestAnimationFrame(() => {
			setScrollTop(e.target.scrollTop);
		});

	useEffect(() => {
		const scrollContainer = ref.current;
		setScrollTop(scrollContainer?.scrollTop);
		scrollContainer.addEventListener('scroll', onScroll);
		return () => scrollContainer.removeEventListener('scroll', onScroll);
	}, []);

	return [scrollTop, ref];
};


export { useAuth, useDetectLocation, useScrollAware };
