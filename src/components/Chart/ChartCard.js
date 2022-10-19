import React from 'react'

function Chart ({ children, title }) {
  return (
    <div className='min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-primary2'>
      <p className='mb-4 font-semibold text-gray-800 dark:text-white'>
        {title}
      </p>
      {children}
    </div>
  )
}

export default Chart
