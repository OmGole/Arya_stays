import React, { useEffect, useState } from 'react'
import NavbarC from '../Components/NavbarC'

import FooterC from '../Components/FooterC';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrders, getPastOrders } from '../Store/orderSlice';
import OrderCard from '../Components/OrderCard';

export default function Orders() {

    const [selectedTab,setSelectedTab] = useState(1);// 1-current, 2-past, 3-cancelled
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.user.uid);
    const orders = useSelector(state => state.order);
    const currentOrders = useSelector(state => state.order.current);
    const pastOrders = useSelector(state => state.order.past);

    useEffect(() => {
        if(selectedTab == 1) {
            dispatch(getCurrentOrders(userId));
        } else {
            dispatch(getPastOrders(userId));
        }
    },[selectedTab]);

    


  return (
    <>
        <NavbarC/>
        <div className='md:mx-20 mx-10'>
            <div className='flex justify-around'>
                <div>
                    <button onClick={()=>{setSelectedTab(1)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==1? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Current Stays</button>
                </div>
                <div>
                    <button onClick={()=>{setSelectedTab(2)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==2? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Past Stays</button>
                </div>
                <div>
                    <button onClick={()=>{setSelectedTab(3)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==3? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Cancelled Stays</button>
                </div>
            </div>


            <div>
                {selectedTab == 1 && currentOrders.map(order => <OrderCard order={order}/>)}
                {selectedTab == 2 && pastOrders.map(order => <OrderCard order={order}/>)}

            </div>

        </div>
        <FooterC/>
    </>
  )
}
