import Link from 'next/link'
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";

const Navbar = ({ todos, setResults }) => {
    const [search, setSearch] = useState("")

    const handleSearch = async () => {
        const response = await puter.ai.chat(
            `Find all related todos for "${search}" from:
        ${JSON.stringify(todos)}
        
        Return only the matching todo text.`
        )

        const aiResult = response.message.content

        const matchedTodos = todos.filter(todo =>
            aiResult.toLowerCase().includes(todo.todo.toLowerCase())
        )

        setResults(matchedTodos)
    }

    return (
        <header className='bg-[#2e2a2a] text-white flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className="logo flex items-center gap-3">
                <img className='w-10' src="/noodle.png" alt="Noodle logo" />
                <h1 className='text-xl font-semibold'>Todo Ramen</h1>
            </div>
            <div className="search-box w-full flex items-center relative">
                <IoSearch className='absolute left-4' />
                <input onChange={(e) => { setSearch(e.target.value) }} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch()
                    }
                }} value={search} className='w-full rounded-2xl border border-white/20 bg-[#382f2f] px-4 py-2 text-sm pl-10 text-white outline-none focus:border-white' type="text" name="search-bar" id="search-bar" placeholder="Search your todos..." />
            </div>
        </header>
    )
}

export default Navbar