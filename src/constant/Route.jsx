import React, { lazy } from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { FcInfo } from 'react-icons/fc'
import {
  RiAdminFill,
  RiBankLine,
  RiBarChartFill,
  RiBriefcase4Fill,
  RiChatPollLine,
  RiMailSettingsFill,
} from 'react-icons/ri'

import { BsCreditCard2Front } from 'react-icons/bs'
import { Navigate } from 'react-router-dom'

import Admin from '@/pages/Admin'
import HomePage from '@/pages/HomePage'
import User from '@/pages/User'
import Error from '@/pages/_error'
import ForgotPassword from '../pages/HomePage/ForgotPassword'
import LoginPage from '../pages/HomePage/LoginPage'
import Policy from '../pages/User/Policy'
import LoginForm from '@/pages/HomePage/LoginPage/Login'
import LoginAdmin from '@/pages/HomePage/LoginAdmin'
import Checkout from '@/pages/User/Checkout'

const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'))
const AdminMail = lazy(() => import('@/pages/Admin/AdminMail'))
const AdminOrder = lazy(() => import('@/pages/Admin/AdminOrder'))
const ClassComponentText = lazy(() => import('@/pages/Admin/AdminOrder/OrderItem'))
const AdminProduct = lazy(() => import('@/pages/Admin/AdminProduct'))
const AdminSetting = lazy(() => import('@/pages/Admin/AdminSetting'))
const AdminUser = lazy(() => import('@/pages/Admin/AdminUser'))

const UserProductPage = lazy(() => import('@/pages/User/Product'))
const UserProductItem = lazy(() => import('@/pages/User/Product/ProductItem'))
const UserOrder = lazy(() => import('@/pages/User/Order'))
const UserProfile = lazy(() => import('@/pages/User/Profile'))

const AdminAbout = lazy(() => import('@/pages/Admin/AdminAbout'))
const AdminTransaction = lazy(() => import('@/pages/Admin/AdminTransaction'))
const CCResult = lazy(() => import('@/pages/User/Result'))
const UserTransaction = lazy(() => import('@/pages/User/Transaction'))

export const AdminRouter = [
  {
    path: '/admin',
    name: 'Dashboard',
    icon: <RiBankLine />,
  },
  {
    path: '/admin/product',
    name: 'Quản lý sản phẩm',
    icon: <RiBarChartFill />,
  },
  {
    path: '/admin/order',
    name: 'Orders',
    icon: <RiChatPollLine />,
  },
  {
    path: '/admin/transaction',
    name: 'Quản lý thanh toán',
    icon: <RiBarChartFill />,
  },
  {
    path: '/admin/user',
    name: 'Người dùng',
    icon: <RiBriefcase4Fill />,
  },
  {
    path: '/admin/mail',
    name: 'Mail',
    icon: <RiMailSettingsFill />,
  },
  {
    path: '/admin/setting',
    name: 'Cài đặt',
    icon: <RiAdminFill />,
  },
]

export const UserRouter = [
  {
    path: '/user/san-pham',
    title: 'Sản phẩm',
    icon: <RiBarChartFill />,
  },
  {
    path: '/user/order',
    title: 'Đơn hàng',
    icon: <RiChatPollLine />,
  },
  // {
  //   path: '/user/transaction',
  //   title: 'Hóa đơn',
  //   icon: <BsCreditCard2Front />,
  // },
  {
    path: '/user/profile',
    title: 'Tài khoản',
    icon: <RiAdminFill />,
  },
  {
    path: '/user/policy',
    title: 'Chính sách',
    icon: <RiChatPollLine />,
  },
]

export const LAYOUT_ROUTER = ({ status, role }) => [
  {
    title: 'Đăng nhập',
    path: '/',
    icon: <BiHomeAlt />,
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/login-admin',
        element: <LoginAdmin />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
    ],
  },
  {
    title: 'Admin',
    path: 'admin',
    element: <Admin status={status} />,
    children:
      status && role === 'admin' ? (
        [
          {
            index: true,
            icon: <RiBarChartFill />,
            element: <AdminDashboard />,
          },
          {
            path: 'product',
            title: 'Quản lý sản phẩm',
            icon: <RiBarChartFill />,
            element: <AdminProduct />,
          },
          {
            path: 'order',
            title: 'Orders',
            icon: <RiChatPollLine />,
            children: [
              {
                index: true,
                element: <AdminOrder />,
              },
              {
                path: ':slug',
                element: <ClassComponentText />,
              },
            ],
          },
          {
            path: 'transaction',
            title: 'Quản lý thanh toán',
            icon: <RiBarChartFill />,
            element: <AdminTransaction />,
          },
          {
            path: 'user',
            title: 'Người dùng',
            icon: <RiBriefcase4Fill />,
            element: <AdminUser />,
          },
          {
            path: 'mail',
            title: 'Mail',
            icon: <RiMailSettingsFill />,
            element: <AdminMail />,
          },
          {
            path: 'setting',
            title: 'Cài đặt',
            icon: <RiAdminFill />,
            element: <AdminSetting />,
          },
          {
            path: 'about',
            title: 'Author',
            icon: <FcInfo />,
            element: <AdminAbout />,
          },
          {
            path: '*',
            element: <Error />,
          },
        ]
      ) : (
        <Navigate to="/" />
      ),
  },
  {
    title: 'User',
    path: 'user',
    element: <User status={status} />,
    children: status ? (
      [
        {
          index: true,
          icon: <RiBarChartFill />,
          element: <Navigate to="/user/san-pham" />,
        },
        {
          path: 'san-pham',
          title: 'Sản phẩm',
          icon: <RiBarChartFill />,
          children: [
            {
              index: true,
              element: <UserProductPage />,
            },
            {
              path: ':slug',
              element: <UserProductItem />,
            },
          ],
        },
        {
          path: 'checkout',
          title: 'Thanh toán',
          element: <Checkout />,
          children: [
            {
              path: ':slug',
              element: <Checkout />,
            },
          ],
        },
        {
          path: 'order',
          title: 'Orders',
          icon: <RiChatPollLine />,
          element: <UserOrder />,
        },
        // {
        //   path: 'transaction',
        //   title: 'Orders',
        //   icon: <BsCreditCard2Front />,
        //   element: <UserTransaction />,
        // },
        {
          path: 'policy',
          title: 'Chính sách hoàn / huỷ',
          icon: <RiChatPollLine />,
          element: <Policy />,
        },
        {
          path: 'result',
          title: 'Kết quả',
          element: <CCResult />,
        },
        {
          path: 'profile',
          title: 'Tài khoản',
          icon: <RiAdminFill />,
          element: <UserProfile />,
        },
        {
          path: '*',
          element: <Error />,
        },
      ]
    ) : (
      <Navigate to="/404" />
    ),
  },
  {
    path: '/404',
    element: <Error />,
  },
  {
    path: '*',
    element: <Error />,
  },
]
