import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux";
import { editUser } from '../Store/userSlice';

const id = "4eb6e7e7e9b7f4194e000001";

const EditUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [name,setName] = useState("");
  const [phone,setPhone] = useState();
  const [email,setEmail] = useState("");
  const [age,setAge] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePhone = (e) => {   
    setPhone(e.target.value);
  }

  const handleAge = (e) => {
    setAge(e.target.value);
  }

  const handleEditUser = (e) => {
    e.preventDefault();

    const updatedUser = {id};
    const newUserDetails = {};

    if(name) newUserDetails.name = name;
    if(email) newUserDetails.email = email;
    if(phone) newUserDetails.phone = phone;
    if(age) newUserDetails.age = age;

    updatedUser.newUser = newUserDetails;
    console.log(updatedUser);
    dispatch(editUser(updatedUser));
  }

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <div>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Name' value={name} onChange={handleName}/>
      <input type="email" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Email' value={email} onChange={handleEmail}/>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Name' value={phone} onChange={handlePhone}/>
      <input type="number" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Age' value={age} onChange={handleAge}/>
      <button onClick={handleEditUser}>Edit User</button>
      
    </div>
  )
}

export default EditUser