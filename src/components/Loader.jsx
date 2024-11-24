import React from 'react'
import 'ldrs/bouncy'

export default function Loader() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <l-bouncy size={60} color={"black"}/>
    </div>
  )
}
