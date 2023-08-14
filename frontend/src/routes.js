import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Administrator
const Users = React.lazy(() => import('./views/admin/users/Users'))
const Company = React.lazy(() => import('./views/admin/company/Company'))
const PolicyList = React.lazy(() => import('./views/admin/policyList/PolicyList'))

//Policy Master
const Cookies = React.lazy(() => import('./views/policyMaster/cookies/Cookies'))
const CookiesAdd = React.lazy(() => import('./views/policyMaster/cookies/CookiesAdd'))
const CookiesEdit = React.lazy(() => import('./views/policyMaster/cookies/CookiesEdit'))
const Policy = React.lazy(() => import('./views/policyMaster/policy/Policy'))
const PolicyAdd = React.lazy(() => import('./views/policyMaster/policy/PolicyAdd'))
const PolicyEdit = React.lazy(() => import('./views/policyMaster/policy/PolicyEdit'))
const PolicyType = React.lazy(() => import('./views/policyMaster/policyType/PolicyType'))
const PolicyTypeAdd = React.lazy(() => import('./views/policyMaster/policyType/PolicyTypeAdd'))
const PolicyTypeEdit = React.lazy(() => import('./views/policyMaster/policyType/PolicyTypeEdit'))

//PDPA Management
const PolicyTypeMgt = React.lazy(() => import('./views/pdpaManagement/policyType/PolicyType'))
const PolicyTypeMgtEdit = React.lazy(() => import('./views/pdpaManagement/policyType/PolicyTypeEdit'))
const PolicyTypeMgtAdd = React.lazy(() => import('./views/pdpaManagement/policyType/PolicyTypeAdd'))
const CookiesListMgt = React.lazy(() => import('./views/pdpaManagement/cookiesList/CookiesList'))
const CookiesListEdit = React.lazy(() => import('./views/pdpaManagement/cookiesList/CookiesListEdit'))
const CookiesListAdd = React.lazy(() => import('./views/pdpaManagement/cookiesList/CookiesListAdd'))

//Account
const Profile = React.lazy(() => import('./views/accounts/profile/Profile'))
const Settings = React.lazy(() => import('./views/accounts/settings/Settings'))

//selectPolicy
const FormData = React.lazy(() => import('./views/selectPolicy/formData/FormData'))
const FormCookies = React.lazy(() => import('./views/selectPolicy/formCookies/FormCookies'))
const FormDC = React.lazy(() => import('./views/selectPolicy/formDC/FormDC'))
const FormDPO = React.lazy(() => import('./views/selectPolicy/formDPO/FormDPO'))
const FormImplement = React.lazy(() => import('./views/selectPolicy/formImplement/FormImplement'))
const FormPlace = React.lazy(() => import('./views/selectPolicy/formPlace/FormPlace'))
const FormSuggest= React.lazy(() => import('./views/selectPolicy/formSuggest/FormSuggest'))
const FormTime = React.lazy(() => import('./views/selectPolicy/formTime/FormTime'))
const FormType = React.lazy(() => import('./views/selectPolicy/formType/FormType'))
const FormUse = React.lazy(() => import('./views/selectPolicy/formUse/FormUse'))
const FormWho = React.lazy(() => import('./views/selectPolicy/formWho/FormWho'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/login', name: 'Login', element: Login },

  { path: '/admin', name: 'admin', element: Users, exact: true },
  { path: '/admin/users', name: 'Users', element: Users },
  { path: '/admin/company', name: 'Company', element: Company },
  { path: '/admin/policyList', name: 'Policy List', element: PolicyList },

  { path: '/policyMaster', name: 'Policy Master', element: Cookies, exact: true },
  { path: '/policyMaster/cookies', name: 'Cookies', element: Cookies },
  { path: '/policyMaster/cookiesAdd', name: 'Cookies', element: CookiesAdd },
  { path: '/policyMaster/cookiesEdit/:id', name: 'Cookies', element: CookiesEdit },
  { path: '/policyMaster/policy/:typeId', name: 'Policy', element: Policy },
  { path: '/policyMaster/policyAdd/:typeId', name: 'Policy Add', element: PolicyAdd },
  { path: '/policyMaster/policyEdit/:id', name: 'Policy Add', element: PolicyEdit },
  { path: '/policyMaster/policyType', name: 'Policy Type', element: PolicyType },
  { path: '/policyMaster/policyTypeAdd', name: 'Policy Type Add', element: PolicyTypeAdd },
  { path: '/policyMaster/policyTypeEdit/:id', name: 'Policy Type Edit', element: PolicyTypeEdit },

  { path: '/pdpaManagement', name: 'PDPA Management', element: PolicyList, exact: true },
  { path: '/pdpaManagement/policyType', name: 'Policy Type', element: PolicyTypeMgt },
  { path: '/pdpaManagement/policyTypeAdd', name: 'Policy Type', element: PolicyTypeMgtAdd },
  { path: '/pdpaManagement/policyTypeEdit/:id', name: 'Policy Type', element: PolicyTypeMgtEdit },
  { path: '/pdpaManagement/cookiesList', name: 'Cookies List', element: CookiesListMgt },
  { path: '/pdpaManagement/cookiesListAdd', name: 'Cookies List', element: CookiesListAdd },
  { path: '/pdpaManagement/cookiesListEdit/:id', name: 'Cookies List', element: CookiesListEdit },

  { path: '/accounts', name: 'Account', element: Profile, exact: true },
  { path: '/accounts/profile', name: 'Profile', element: Profile },
  { path: '/accounts/settings', name: 'Settings', element: Settings },

  { path: '/selectPolicy', name: 'Select Policy', element: FormSuggest, exact: true },
  { path: '/selectPolicy/formData', name: 'Policy Data Form', element: FormData },
  { path: '/selectPolicy/formCookies', name: 'Cookies Form', element: FormCookies },
  { path: '/selectPolicy/formDC', name: 'DC Form', element: FormDC },
  { path: '/selectPolicy/formDPO', name: 'DPO Form', element: FormDPO },
  { path: '/selectPolicy/formImplement', name: 'Implement Form', element: FormImplement },
  { path: '/selectPolicy/formPlace', name: 'Place Form', element: FormPlace },
  { path: '/selectPolicy/formSuggest', name: 'Suggest Form', element: FormSuggest },
  { path: '/selectPolicy/formTime', name: 'Time Form', element: FormTime },
  { path: '/selectPolicy/formType', name: 'Type Form', element: FormType },
  { path: '/selectPolicy/formUse', name: 'Use Form', element: FormUse },
  { path: '/selectPolicy/formWho', name: 'Who Form', element: FormWho },

]

export default routes
