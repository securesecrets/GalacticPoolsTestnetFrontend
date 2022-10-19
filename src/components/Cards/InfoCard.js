import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoCard ({ title, value, children: icon }) {
  return (
    <Card style={{ background: 'linear-gradient(to right,#9A47B9, #4D2D9F)' }}>
      <CardBody className='flex items-center '>
        {icon}
        <div>
          <p className='mb-2 text-sm font-medium text-gray-600 dark:text-white'>
            {title}
          </p>
          <p className='text-lg font-semibold text-gray-700 dark:text-white'>
            {value}
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
