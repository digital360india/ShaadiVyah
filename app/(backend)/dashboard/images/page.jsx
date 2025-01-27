import EditImages from '@/pages/backend/EditImages'
import React from 'react'

const page = () => {
  return (
    <div className="bg-[#FFF5E8] bg-[url('/images/dashbg.svg')] pt-10 md:pt-0 w-full h-[100vh] md:h-full object-cover bg-cover"><EditImages /></div>
  )
}

export default page