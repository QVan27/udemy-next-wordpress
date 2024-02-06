import React from 'react'
import Image from 'next/image'

export const Cover = ({ children, background }) => {
  return (
    <div className='h-screen bg-slate-800 relative min-h-[400px] text-white flex justify-center items-center'>
      <Image
        alt='Cover'
        src={background}
        fill
        cover='true'
        className='mix-blend-soft-light'
      />
      <div className='max-w-5xl z-10'>{children}</div>
    </div>
  )
}

