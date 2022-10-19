import React, { useState } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import UserView from './UserView'
function UserPoolDetails (props) {
  const [value, setValue] = useState(0)

  return (
    <div>
      <div>
        <button
          onClick={event => props.setViewStatus(null)}
          className='text-white hover:text-gray-400'
        >
          Go Back
        </button>
        <Tabs selectedIndex={value} onSelect={index => console.log(index)}>
          <div className='dropMenu flex justify-end'>
            <select
              className=' tabSelect  w-1/4 text-center h-10 text-m dark:text-gray-200 focus:outline-none focus:border-blue-400 dark:border-gray-600 dark:bg-gray-700 focus:shadow-outline-purple dark:focus:shadow-outline-gray dark:focus:border-gray-600 form-number leading-5'
              style={{
                border: '2px solid #ac94fa ',
                borderRadius: '5px',
                marginBottom: '2px'
              }}
              onChange={e => {
                setValue(e.target.selectedIndex)
              }}
            >
              <option value={1}>USER VIEW </option>
              <option value={2}>POOL STATS</option>
            </select>
          </div>

          <TabList className=''>
            <Tab onClick={() => setValue(0)}></Tab>
            <Tab onClick={() => setValue(1)}></Tab>
          </TabList>

          <div className='Panel'>
            <TabPanel>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                <UserView />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                POOL STATS
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default UserPoolDetails
