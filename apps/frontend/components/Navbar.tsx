import React from 'react'
import Image from 'next/image'
import { useCompilerContext } from '@/context/AppContext'

function Navbar() {
  const {theme} = useCompilerContext();
  const textColor = theme === 'dark'?"text-white":"text-black"
  const background = theme === 'dark'?" from-gray-800 to-gray-900 border-b":" from-gray-200 to-gray-400 border-b"
  return (
    <div className={`h-32  flex p-5 gap-3  w-full bg-gradient-to-r ${background} border-gray-700 shadow-md`}>
        <div className={`text-4xl flex items-center font-parry ${textColor}`}>
            Padfoot Coder
        </div>
        <Image src="/padfoot.png" alt="Padfoot" width={60} height={40} />
    </div>
  )
}

export default Navbar