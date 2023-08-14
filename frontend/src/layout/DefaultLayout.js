import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = ({ site_location }) => {
  return (
    <div>
      <AppSidebar site_location={site_location} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader site_location={site_location} />
        <div className="body flex-grow-1 px-3">
          <AppContent site_location={site_location} />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

// 👇️ define prop types for the component
DefaultLayout.propTypes = {
  site_location: PropTypes.string,
}

export default DefaultLayout
