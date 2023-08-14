import React, { Component, Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const Cookies_page = React.lazy(() => import('./views/pages/pdpa/CookiesContent'))
const Pdpa_page = React.lazy(() => import('./views/pages/pdpa/PdpaContent'))
const PrintPdpa = React.lazy(() => import('./views/pages/pdpa/PrintPdpa'))

export default function App() {
  const site_location = 'http://localhost'
  // const site_location = "http://150.95.30.128";


  localStorage.setItem('siteLocation', site_location)

  const localLoginstatus = localStorage.getItem('loginNow')
  const userId = localStorage.getItem('userId')

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login site_location={site_location}/>} />
          <Route exact path="/register" name="Register Page" element={<Register site_location={site_location}/>} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/cookies" name="Cookies contents page" element={<Cookies_page />} />
          <Route exact path="/pdpa" name="PDPA contents page" element={<Pdpa_page />} />
          <Route exact path="/printPdpa" name="Print PDPA Page" element={<PrintPdpa />} />
          {localLoginstatus === false || localLoginstatus === 'false' ? (
            <Route
              exact
              path="*"
              name="Login Page"
              element={<Login site_location={site_location} />}
            />
          ) : (
            <Route path="*" name="Home" element={<DefaultLayout site_location={site_location} />} />
          )}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
