import React from 'react'

const ContentWrapper = ({children}: any) => {
  return (
    <div className="p-4 bg-white">
      {children}
    </div>
  )
}

export default ContentWrapper