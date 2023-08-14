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
]

export default _nav
