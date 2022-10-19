import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

function Sidebar () {
  return (
    <div className='bg-white dark:bg-primary2'>
      <DesktopSidebar />
      <MobileSidebar />
    </div>
  )
}

export default Sidebar
