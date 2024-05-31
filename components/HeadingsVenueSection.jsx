import React from 'react'

const HeadingsVenueSection = ({text1, text2}) => {
  return (
    <div className="md:text-4xl text-[34px] px-6 font-semibold text-pink flex gap-4 md:px-12 lg:pl-[100px]"> 
    <p>{text1}</p>
    <p className="font-dancing-script" >{text2}</p></div>
  )
}

export default HeadingsVenueSection