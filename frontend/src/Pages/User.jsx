import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux";
import { createUser, getUserById } from '../Store/userSlice';

const id = "4eb6e7e7e9b7f4194e000001";

const User = () => {
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

  const handleCreateUser = (e) => {
    e.preventDefault();
    const userDetails = {_id:id, name, email, phone:Number(phone),age: Number(age)};
    console.log(userDetails);
    dispatch(createUser(userDetails));
  }

  const handleGetUser = (e) => {
    e.preventDefault();
    dispatch(getUserById(id));
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Name' value={name} onChange={handleName}/>
      <input type="email" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Email' value={email} onChange={handleEmail}/>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='phone' value={phone} onChange={handlePhone}/>
      <input type="number" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Age' value={age} onChange={handleAge}/>
      <button onClick={handleCreateUser}>Create User</button>
      <button onClick={handleGetUser}>get user</button>
    </div>
  )
}

export default User;