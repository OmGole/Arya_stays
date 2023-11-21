
import React, { useEffect, useState } from 'react'
import { Label, TextInput, Button } from 'flowbite-react';
import NavbarC from '../Components/NavbarC';
import FooterC from '../Components/FooterC';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createUser, editUser, getUserById } from '../Store/userSlice';

export default function Profile() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const[editName,setEditName] = useState(false)
    const[editEmail,setEditEmail] = useState(false)
    const[editNumber,setEditNumber] = useState(false)
    const[editAge,setEditAge] = useState(false)

    const[name,setName] = useState('');
    const[email,setEmail] = useState('')
    const[number,setNumber] = useState('');
    const[age,setAge] = useState('')

    const changeEditAge = () => {
        setEditAge(false);
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
        if(!name || !email || !number || !age) {
            alert("Please fill the missing details");
        } else {
            if(Object.keys(user.userDetails).length == 0) {
                const userDetails ={_id:user.user.uid, name, email, phone: Number(number),age:Number(age)}
                dispatch(createUser(userDetails));
            } else {
                const updatedUser = {id:user.user.uid};
                const newUser = {};

                if(!editName) newUser.name = name;
                if(!editEmail) newUser.email = email;
                if(!editNumber) newUser.number = Number(number);
                if(!editAge) newUser.age = Number(age);

                updatedUser.newUser = newUser;
                dispatch(editUser(updatedUser));
            }
            // saveChanges; update user data using post request
    
            setEditName(true);
            setEditEmail(true);
            setEditNumber(true);
            setEditAge(true);


        }
        
    }

    useEffect(() => {
        dispatch(getUserById(user.user.uid));
    },[])

    useEffect(() => {
        if(Object.keys(user.userDetails).length > 0) {
            setName(user.userDetails.name);
            setEmail(user.userDetails.email);
            setAge(user.userDetails.age);
            setNumber(user.userDetails.phone);

            setEditName(true);
            setEditEmail(true);
            setEditNumber(true);
            setEditAge(true);
        }
    },[user.userDetails]);

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
                <TextInput type="text" id="" placeholder="Your Name" disabled={editName} value={name} onChange={(e) => setName(e.target.value)}/>
                <div className='flex justify-between mt-4'>
                    
                    <Label htmlFor="">Email Id</Label>
                    <button onClick={changeEditEmail} className='text-red-500 underline'>Edit</button>
                </div>
                <TextInput type="email" id="" placeholder="Your Email Id" disabled={editEmail} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className='flex justify-between mt-4'>
                    
                    <Label htmlFor="">Phone Number</Label>
                    <button onClick={changeEditNumber} className='text-red-500 underline'>Edit</button>
                </div>
                <TextInput type="number" id="" placeholder="Your Phone Number" disabled={editNumber} value={number} onChange={(e) => setNumber(e.target.value)}/>
                <div className='flex justify-between mt-4'>
                    
                    <Label htmlFor="">Age</Label>
                    <button onClick={changeEditAge} className='text-red-500 underline'>Edit</button>
                </div>
                <TextInput type="number" id="" placeholder="Age" disabled={editAge} value={age} onChange={(e) => setAge(e.target.value)}/>
                
                <h1 className='font-medium text-green-600 my-4'>Tip: Add above details for faster Web Check-In</h1>
                <Button color="success" onClick={saveChanges} disabled={editName && editEmail && editNumber && editAge} >Save</Button>
            </div>
            <div className='md:w-1/3  rounded-lg border-2 border-slate-200'>
                {/* <h1 className="text-4xl font-bold">Profile</h1> */}
            </div>
        </div>
        <FooterC/>
    </div>
  )
}
