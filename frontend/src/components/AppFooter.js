import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://www.utcc.ac.th/" target="_blank" rel="noopener noreferrer">
          PDPA Application
        </a>
        <span className="ms-1">&copy; 2023.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.utcc.ac.th/" target="_blank" rel="noopener noreferrer">
          Doctor &amp; June
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
