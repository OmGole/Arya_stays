import React from 'react'
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import logo from '../Resources/logo.png'
import user1 from '../Resources/user1.png'
export default function NavbarC() {
  return (
    <Navbar fluid rounded className='md:mx-20 mx-8'>
      <Navbar.Brand href="#">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Aarya Stays Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user1} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Login</Dropdown.Item>
          <Dropdown.Item>Sign Up</Dropdown.Item>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Contact</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#" className='text-md '>Find Near By</Navbar.Link>
        <Navbar.Link href="#" className='text-md'>View On Map</Navbar.Link>
        <Navbar.Link href="#" className='text-md'>Blogs</Navbar.Link>
        <Navbar.Link href="#">Web Check-in</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
