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

import { Navigate, Outlet } from 'react-router-dom'

import Admin from '@/pages/Admin'
import HomePage from '@/pages/HomePage'
import User from '@/pages/User'
import Error from '@/pages/_error'
import LoginPage from '../pages/HomePage/LoginPage'
import Policy from '../pages/User/Policy'
import LoginForm from '@/pages/HomePage/LoginPage/Login'
import LoginAdmin from '@/pages/HomePage/LoginAdmin'
import Checkout from '@/pages/User/Checkout'
import Verify from '../pages/HomePage/LoginPage/Verify'

const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'))
const AdminMail = lazy(() => import('@/pages/Admin/AdminMail'))
const AdminOrder = lazy(() => import('@/pages/Admin/AdminOrder'))
const AdminProduct = lazy(() => import('@/pages/Admin/AdminProduct'))
const AdminSetting = lazy(() => import('@/pages/Admin/AdminSetting'))
const AdminUser = lazy(() => import('@/pages/Admin/AdminUser'))
const UserProductPage = lazy(() => import('@/pages/User/Product'))
const UserProductItem = lazy(() => import('@/pages/User/Product/ProductItem'))
const UserOrder = lazy(() => import('@/pages/User/Order'))
const UserProfile = lazy(() => import('@/pages/User/Profile'))
const AdminAbout = lazy(() => import('@/pages/Admin/AdminAbout'))
const AdminTransaction = lazy(() => import('@/pages/Admin/AdminTransaction'))
const SettingPayment = lazy(() => import('@/pages/Admin/AdminSetting/Payment'))
const SettingMail = lazy(() => import('@/pages/Admin/AdminSetting/Mail'))
const AdminEditor = lazy(() => import('@/pages/Admin/AdminEditor'))
const CCResult = lazy(() => import('@/pages/User/Result'))

const AdminRouter = [
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
    name: 'Hóa đơn',
    icon: <RiBarChartFill />,
  },
  // {
  //   path: '/admin/editor',
  //   name: 'Editor',
  //   icon: <RiBarChartFill />,
  // },
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

const UserRouter = [
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

const ADMIN_ROUTE = (status, role) => ({
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
          ],
        },
        {
          path: 'transaction',
          title: 'Quản lý thanh toán',
          icon: <RiBarChartFill />,
          element: <AdminTransaction />,
        },
        {
          path: 'editor',
          title: 'Editor',
          icon: <RiBarChartFill />,
          children: [
            {
              index: true,
              path: '',
              element: <Navigate to="/admin" />,
            },
            {
              path: ':id',
              element: <AdminEditor />,
            },
          ],
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
          element: <Outlet />,
          children: [
            {
              path: '',
              index: true,
              element: <AdminSetting />,
            },
            {
              path: 'payment',
              title: 'Thanh toán',
              element: <SettingPayment />,
            },
            {
              path: 'mail',
              title: 'Email',
              element: <SettingMail />,
            },
          ],
        },
        {
          path: 'about',
          title: 'Author',
          icon: <FcInfo />,
          element: <AdminAbout />,
        },
      ]
    ) : (
      <Navigate to="/" />
    ),
})
const USER_ROUTE = (status, role) => ({
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
    <Navigate to="/" />
  ),
})
const LAYOUT_ROUTER = ({ status, role }) => [
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
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/verification',
        element: <Verify />,
      },
    ],
  },
  ADMIN_ROUTE(status, role),
  USER_ROUTE(status, role),
  {
    path: '/404',
    element: <Error />,
  },
  // {
  //   path: '*',
  //   element: <Error />,
  // },
]

export { AdminRouter, UserRouter, LAYOUT_ROUTER }
