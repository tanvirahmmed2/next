import React from "react"

const RootLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
      <p>DashBoard Navbar</p>
      {children}
    </div>
  )
}

export default RootLayout
