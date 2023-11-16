import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCard, deleteCard, editCard, getAllCards, getSingleCard } from '../Store/cardSlice';

const Card = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.card);

  const [icon,setIcon] = useState();
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState();

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIcon(reader.result);
    }
  }

  const handleIcon = (files) => {
    const file = files[0];
    setFileToBase(file);
    console.log(file);
  }

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  }

  const handleCreateCard = (e) => {
    e.preventDefault();
    const newCard = {icon,title,description}
    console.log(newCard);
    dispatch(createCard(newCard));
  }

  const handleGetAllCard = (e) => {
    e.preventDefault();
    dispatch(getAllCards());
  }

  const handleGetSingleCard = (e) => {
    e.preventDefault();
    dispatch(getSingleCard("65561f2c252b2827ce26cd21"));
  }

  const handleUpdateCard = (e) => {
    e.preventDefault();
    const newCard = {};
    if(icon) newCard.icon = icon;
    if(title) newCard.title= title;
    if(description) newCard.description = description;
    const updatedCard = {id:"65561f2c252b2827ce26cd21", newCard};
    dispatch(editCard(updatedCard));
  }

  const handleDeleteCard = (e) => {
    e.preventDefault();
    dispatch(deleteCard("65561f2c252b2827ce26cd21"));
  }

  useEffect(() => {
    console.log(cards);
  }, [cards]);



  return (
    <div>
      <div>
        <label>Icon: </label>
        <input type="file" accept="image/" onChange={(e) => handleIcon(e.target.files)}/>
      </div>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Title' value={title} onChange={handleTitle}/>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Description' value={description} onChange={handleDescription}/>

      <hr />
      <button onClick={handleCreateCard}>Create Card</button>    

      <hr />
      <button onClick={handleGetAllCard}>Get All Card</button>    

      <hr />
      <button onClick={handleGetSingleCard}>Get Single Card</button>    

      <hr />
      <button onClick={handleUpdateCard}>Update Card</button>    

      <hr />
      <button onClick={handleDeleteCard}>Delete Card</button>    

    </div>
  )
}

export default Card