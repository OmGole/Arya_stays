
import React, { useState } from 'react'
import { Label, TextInput, Button } from 'flowbite-react';
import NavbarC from '../Components/NavbarC';
import FooterC from '../Components/FooterC';

export default function Profile() {
    const[editName,setEditName] = useState(true)
    const[editEmail,setEditEmail] = useState(true)
    const[editNumber,setEditNumber] = useState(true)
    const[editAadhar,setEditAadhar] = useState(true)
    const[editAddress,setEditAddress] = useState(true)

    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[number,setNumber] = useState('')
    const[aadhar,setAadhar] = useState('')
    const[address,setAddress] = useState('')

    const changeEditAadhar = () => {
        setEditAadhar(false);
    }

    const changeEditAddress = () => {
        setEditAddress(false);
    }
    

    const changeEditNumber = () => {
        setEditNumber(false);
    }


    const changeEditName = () =>{
        setEditName(false);
    }

    const changeEditEmail = () =>{
        setEditEmail(false);
    }

    const saveChanges = () =>{

        // saveChanges; update user data using post request

        setEditName(true);
        setEditEmail(true);
        setEditNumber(true);
        setEditAadhar(true);
        setEditAddress(true);
    }

  return (
    <div>
        <NavbarC/>
        <div className='w-full flex flex-wrap px-12 flex-col mt-4 md:flex-row'>
            <div className='md:w-2/3 px-10 '>
                <h1 className='text-xl font-bold'>Personal Info</h1>
                <div className='flex justify-between mt-4'>
                    
                    <Label htmlFor="">Name</Label>
                    <button onClick={changeEditName} className='text-red-500 underline'>Edit</button>
                </div>
                <TextInput type="text" id="" placeholder="Your Name" disabled={editName} value={'Shritik'} />
                <div className='flex justify-between mt-4'>
                    
                    <Label htmlFor="">Email Id</Label>
                    <button onClick={changeEditEmail} className='text-red-500 underline'>Edit</button>
                </div>
                <TextInput type="email" id="" placeholder="Your Email Id" disabled={editEmail} value={'Shritik'} />
                <div className='flex justify-between mt-4'>
                    
                    <Label htmlFor="">Phone Number</Label>
                    <button onClick={changeEditNumber} className='text-red-500 underline'>Edit</button>
                </div>
                <TextInput type="number" id="" placeholder="Your Phone Number" disabled={editNumber} value={'1234567890'} />
                <div className='flex justify-between mt-4'>
                    
                    <Label htmlFor="">Aadhar Number</Label>
                    <button onClick={changeEditAadhar} className='text-red-500 underline'>Edit</button>
                </div>
                <TextInput type="number" id="" placeholder="Your Phone Number" disabled={editAadhar} value={'1234567890'} />
                <div className='flex justify-between mt-4'>
                    
                    <Label htmlFor="">Current Address</Label>
                    <button onClick={changeEditAddress} className='text-red-500 underline'>Edit</button>
                </div>
                <TextInput type="text" id="" placeholder="Your Current Address" disabled={editAddress} value={'abc'} />
                <h1 className='font-medium text-green-600 my-4'>Tip: Add above details for faster Web Check-In</h1>
                <Button color="success" onClick={saveChanges} >Save</Button>
            </div>
            <div className='md:w-1/3  rounded-lg border-2 border-slate-200'>
                {/* <h1 className="text-4xl font-bold">Profile</h1> */}
            </div>
        </div>
        <FooterC/>
    </div>
  )
}
