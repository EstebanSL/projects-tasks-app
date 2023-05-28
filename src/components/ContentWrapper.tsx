import React from 'react'

const ContentWrapper = ({children}: any) => {
  return (
    <div className="p-4 bg-white rounded-md rounded-tl-xl h-full">
      {children}
    </div>
  )
}

export default ContentWrapper