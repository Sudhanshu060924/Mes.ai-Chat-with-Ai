import React from 'react'
import Sidebar from '../components/Sidebar'
import Messagearea from '../components/Messagearea'

function Home() {
  return (
    <div className='w-full h-screen flex'>
     <Sidebar />
     <Messagearea />
     
    </div>
  )
}

export default Home
