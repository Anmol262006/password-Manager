import React from 'react'

const Navbar = () => {
  return (
    <header className='top-0 w-full fixed z-10'>
   <nav className='flex justify-between px-5 pb-2 h-[50px] bg-gray-700 text-white items-center  '>
    <h1 className='font-bold text-[18px]'> &lt;Pass
    <span className='text-green-600'>/OP</span>&gt; </h1>

    <ul className='flex gap-sm font-medium '>
        <li className='hover:bg-green-600 rounded-3xl w-18.5 text-center'><a href="/">Home</a></li>
        <li className='hover:bg-green-600 rounded-3xl w-18.5 text-center'><a href="">Contacts</a></li>
        <li className='hover:bg-green-600 rounded-3xl w-18.5 text-center'><a href="">Services</a></li>
    </ul>
  
    <div className="gitLogo" >
  <a href="https://github.com/Anmol262006" target='blank'><img src="src/assets/download.png" alt="image"  width={40} className='rounded-full'/></a>    
    </div>
 
   </nav>
   </header>
  )
}

export default Navbar