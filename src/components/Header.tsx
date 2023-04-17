import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonComponent, InputComponent } from '.'

export const Header = () => {
  return (
    <div className='p-4 bg-white flex justify-between items-center drop-shadow-md z-100'>
      <h1 className='text-3xl text-sky-600 font-black'>
        ProTaskApp
      </h1>

      <InputComponent
          id="Email"
          type="search"
          placeholder="Search project"
          // value={email}
          // onChange={(e: any) => setEmail(e.target.value)}
        />

      <div className='flex items-center gap-4'>
        <Link to="/projects" className='hover:underline text-sky-800 font-bold'>Projects</Link>
        <ButtonComponent type="button" btnText="Log out" onClick={() => console.log('xd')} />
      </div>
    </div>
  )
}