import React from 'react'

const KpiCards = ({title, description, icon}) => {
  return (
    <div className='w-1/4 border rounded-md bg-white shadow-sm px-4 py-4 flex justify-between'>
        <div className="left flex flex-col gap-y-1">
            <h3 className='text-sm text-[#8b8b8b]'>{title}</h3>
            <h1 className='font-semibold text-2xl text-primary-txt'>{description}</h1>
        </div>
        <div className="right">
            <div className='border p-2 rounded-md text-xl'>
                {icon}
            </div>
        </div>
    </div>
  )
}

export default KpiCards