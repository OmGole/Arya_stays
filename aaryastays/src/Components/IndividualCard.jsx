import { Card } from 'flowbite-react'
import React, { useState } from 'react'
import HouseRules from '../Resources/HouseRules.png'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {getSingleCard} from '../Store/cardSlice'
import api from '../api/api';

export default function IndividualCard({id}) {

    const [cardData,setCardData] = useState()
    useEffect(()=>{
        getCard();
    },[id])

    const getCard = async()=>{
        const response = await api.get(`/api/v1/card/${id}`);
        if(response.data){
            setCardData(response.data)
        }
    }

  return (
        
            <div className='lg:w-1/2   lg:px-2'>
                <div className='border-[#6ACDE9] border-2 divide-y rounded-lg divide-[#6ACDE9]'>
                    <div className='flex items-center justify-center gap-x-3 py-3 '>
                        <img src={cardData?.icon?.url}></img>
                        <h1 className='text-2xl font-medium'>{cardData?.title}</h1>
                    </div>
                    <div className=' flex  justify-center'>
                        <ul className='list-disc lg:text-lg pl-8 py-3'>
                            {cardData?.description}
                        </ul>
                    </div>
                </div>
            </div>
            
        
  )
}
