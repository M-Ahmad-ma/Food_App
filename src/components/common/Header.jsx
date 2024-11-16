import React from 'react'
import logo from '../../assets/logo.svg'
const Header = (props) => {
  return (
    <div>
        <div>
            <div className='flex items-center justify-between gap-2 px-2'> 
                <div>
                <h1 className='text-4xl font-bold text-white'>{props.name}</h1>
                <p className='text-light-text mt-2'>{props.date}</p>
                </div> 
                <div className={`${props.setinput ? 'hidden' : 'block'}`}> 
                    <input type="text" placeholder='Search' className='max-w-[20rem] text-white lg:block hidden border-dark-border border-2 h-10 rounded-lg p-2 bg-Form-bg' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header