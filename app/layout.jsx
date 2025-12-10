import React from 'react'

export const metadata={
    title: 'Next',
    description:'Next home page'
}

const MainLayout = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default MainLayout
