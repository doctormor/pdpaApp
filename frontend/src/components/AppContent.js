import React, { Suspense, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = ({ site_location }) => {
  const userId = localStorage.getItem('userId')

  const [navLink, setNavLink] = useState('')

  useEffect(() => {
    axios
      .get(`${site_location}:3001/api/users/userByid/${userId}`)
      .then((response) => {

        if(response.data[0].userType == 'A'){
          setNavLink("admin/users")
        }else{
          setNavLink("dashboard")
        }
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {}
  }, [])

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element site_location={site_location} />}
                />
              )
            )
          })}

          <Route path="/" element={<Navigate to={navLink} replace />} />

        </Routes>
      </Suspense>
    </CContainer>
  )
}

// 👇️ define prop types for the component
AppContent.propTypes = {
  site_location: PropTypes.string,
}

export default React.memo(AppContent)
