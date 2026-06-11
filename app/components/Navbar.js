import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <header className='bg-[#2e2a2a] text-white flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className="logo flex items-center gap-3">
                <img className='w-10' src="/noodle.png" alt="Noodle logo" />
                <h1 className='text-xl font-semibold'>Todo Ramen</h1>
            </div>
            <div className="search-box w-full">
                <input className='w-full rounded-2xl border border-white/20 bg-[#382f2f] px-4 py-2 text-sm text-white outline-none focus:border-white' type="text" name="search-bar" id="search-bar" placeholder="Search..." />
            </div>
        </header>
    )
}

export default Navbar