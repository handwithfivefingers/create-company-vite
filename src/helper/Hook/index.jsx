import axios from '@/config/axios';
import React, { useState, useEffect } from 'react';
import { AuthAction, RouteAction } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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

export { useAuth, useDetectLocation };
