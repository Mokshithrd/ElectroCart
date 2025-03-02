import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { GiElectric } from 'react-icons/gi';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';

export const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg'>
      <nav className='flex justify-between items-center h-16 max-w-7xl mx-auto px-6'>
        {/* Logo Section */}
        <div className='flex items-center text-white text-3xl font-extrabold tracking-wide'>
          <GiElectric className='text-blue-300 mr-3' />
          <NavLink to='/'>ElectroCart</NavLink>
        </div>

        {/* Navigation Links */}
        <div className='flex items-center font-medium text-white space-x-8'>
          <NavLink to='/' className='hover:text-blue-300 transition-transform transform hover:scale-105'>
            Home
          </NavLink>

          {/* Categories Dropdown */}
          <div className='relative'>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='flex items-center gap-2 hover:text-blue-300 transition-transform transform hover:scale-105'
            >
              <BiCategoryAlt className='text-xl' /> Categories <IoIosArrowDown />
            </button>

            {isDropdownOpen && (
              <div className='absolute left-0 mt-2 w-52 bg-white shadow-2xl rounded-lg z-50 overflow-hidden animate-slideDown'>
                {[ 'TV', 'Audio', 'Gaming', 'Laptop', 'Mobile', 'Appliances' ].map((item) => (
                  <NavLink
                    key={item}
                    to={`/category/${item.toLowerCase()}`}
                    className='block px-5 py-3 text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Cart Section */}
          <NavLink to='/cart' className='relative flex items-center hover:text-blue-300 transition-transform transform hover:scale-105'>
            <FaShoppingCart className='text-3xl' />
            {cart.length > 0 && (
              <span className='absolute -top-2 -right-3 bg-green-600 text-sm w-6 h-6 flex justify-center items-center animate-bounce rounded-full text-white font-bold'>
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};