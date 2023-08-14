import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilList,
  cilHouse,
  cilCheckCircle,
  cilTextSquare,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Administrator',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/admin/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Company',
    to: '/admin/company',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Policy Master',
    to: '/policyMaster',
    icon: <CIcon icon={cilTextSquare} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Policy Master Type',
        to: '/policyMaster/policyType',
      },
      {
        component: CNavItem,
        name: 'Cookies Master',
        to: '/policyMaster/cookies',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Policy Management',
  },
  {
    component: CNavItem,
    name: 'Policy Type',
    to: '/pdpaManagement/policyType',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Policy List',
    to: '/selectPolicy',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ข้อมูลทั่วไป',
        to: '/selectPolicy/formData',
      },
      {
        component: CNavItem,
        name: 'แหล่งที่เก็บข้อมูล',
        to: '/selectPolicy/formImplement',
      },
      {
        component: CNavItem,
        name: 'ประเภทข้อมูลที่เก็บ',
        to: '/selectPolicy/formType',
      },
      {
        component: CNavItem,
        name: 'สถานที่เก็บข้อมูล',
        to: '/selectPolicy/formPlace',
      },
      {
        component: CNavItem,
        name: 'ใช้ข้อมูลทำอะไรบ้าง',
        to: '/selectPolicy/formUse',
      },
      {
        component: CNavItem,
        name: 'การเปิดเผยข้อมูล',
        to: '/selectPolicy/formWho',
      },
      {
        component: CNavItem,
        name: 'ผู้ควบคุมข้อมูล',
        to: '/selectPolicy/formDC',
      },
      {
        component: CNavItem,
        name: 'เจ้าหน้าที่คุ้มครองข้อมูล',
        to: '/selectPolicy/formDPO',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Cookies List',
    to: '/pdpaManagement/cookiesList',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
]

export default _nav
