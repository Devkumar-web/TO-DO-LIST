import React from 'react'

const navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-800 text-white py-2">
        <div className="logo">
            <span className='font-bold text-xl mx-9 hover:blink transition-all'>iTask</span>
        </div>
        <ul className="flex gap-10 mx-9 ">
            <li className='coursor-pointer hover:font-bold transition-all duration-40'>
                Home
            </li>
            <li className='coursor-pointer hover:font-bold transition-all duration-40'>
                Your tasks
            </li>
        </ul>
    </nav>
  )
}

export default navbar
