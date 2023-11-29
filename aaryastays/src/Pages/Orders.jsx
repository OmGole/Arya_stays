import React, { useEffect, useState } from 'react'
import NavbarC from '../Components/NavbarC'

import FooterC from '../Components/FooterC';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrders, getPastOrders } from '../Store/orderSlice';
import OrderCard from '../Components/OrderCard';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import api from '../api/api';
import { authentication } from '../firebase/config';
import {getPropertyById} from '../Store/propertySlice'
import WishListCard from '../Components/WishListCard';

export default function Orders() {

    const [selectedTab,setSelectedTab] = useState(1);// 1-current, 2-past, 3-cancelled
    const dispatch = useDispatch();
    // const userId = useSelector(state => state.user.user.uid);
    // const orders = useSelector(state => state.order);
    const property = useSelector(state => state.propertyById)
    const currentOrders = useSelector(state => state.order.current);
    const pastOrders = useSelector(state => state.order.past);
    const location = useLocation();
    const [user,setUser] = useState(null)
    const [wishlist,setWishList] = useState([])
    const [wishlistProperties,setWishlistProperties] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const { state } = location;
        const  id  = state?.id;
        if(id){
            setSelectedTab(id)
        }
    },[location])

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
              setUser(currentUser);
              setLoading(false); // User data is available, so set loading to false
      
              try {
                const wishlistData = await api.get(`api/v1/user/wishlist/${currentUser.uid}`);
                setWishList(wishlistData.data)
                getWishListProperty(wishlistData.data)
              } catch (error) {
                console.error('Error fetching wishlist:', error);
              }
            } else {
              setUser(null);
              setLoading(false); // User data is not available, set loading to false
              // Reset wishlist if user is not available
              setWishList([]); // Uncomment this line if needed
            }
          });
      
          return () => unsubscribe();
        
      }, []);

      const getWishListProperty = async (wishlistData) =>{
        if(wishlistData.length>0){
            const list = await Promise.all(
              wishlistData.map(async (item, index) => {
                  const result = await api.get(`/api/v1/property/${item}`);
                //   console.log(result.data)
                    return result.data; 
                })
            );
            // console.log(list[0])
            setWishlistProperties(list)
        }else{
            setWishlistProperties([])
        }
        
      }

      const navigate = useNavigate()

      useEffect(() => {
        if (!loading && user) {
          console.log(user)
          if (selectedTab === 1) {
            dispatch(getCurrentOrders(user.uid));
          } else if (selectedTab === 2) {
            dispatch(getPastOrders(user.uid));
          } else if (selectedTab === 3 && user ) { 
            const fetchWishlist = async () => {
              try {
                const wishlistData = await api.get(`api/v1/user/wishlist/${user.uid}`);
                setWishList(wishlistData.data);
                getWishListProperty(wishlistData.data)
              } catch (error) {
                console.error('Error fetching wishlist:', error);
              }
            };
            fetchWishlist();
          }
        }
        if(!loading && user === null){
          alert("You must be Logged in")
          navigate('/')
        }
        
        
      }, [selectedTab, user, loading, dispatch]);

      // useEffect(()=>{
        
      // },[loading,user])

    


  return (
    <>
        <NavbarC/>
        <div className='md:mx-20 mx-8'>
            <div className='flex justify-around'>
                <div>
                    <button onClick={()=>{setSelectedTab(1)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==1? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Current Stays</button>
                </div>
                <div>
                    <button onClick={()=>{setSelectedTab(2)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==2? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Past Stays</button>
                </div>
                <div>
                    <button onClick={()=>{setSelectedTab(3)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==3? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Wishlist</button>
                </div>
            </div>


            <div>
                { selectedTab == 1 ? (currentOrders.length > 0 ? currentOrders.map(order => <OrderCard order={order} validity='current'/>) : 
                <>
                <h1 className='md:text-3xl font-bold mt-20 underline underline-offset-8 decoration-1'>No Bookings yet!</h1>
                <Link to="/"><button className='rounded-lg border-2 py-3 px-4 border-slate-800 mt-5 font-medium'> Make your 1st Booking</button></Link>
                <hr className='my-4'></hr>
                <h1 className='text-lg  font-medium mb-20'>Confused to find the Homestay? Contact Us</h1>
                </>):<></>}
                { selectedTab == 2 ? (pastOrders.length > 0 ? pastOrders.map(order => <OrderCard order={order} validity='past'/>) : <>
                <h1 className='md:text-3xl font-bold mt-20 underline underline-offset-8 decoration-1'>No Bookings yet!</h1>
                <Link to="/"><button className='rounded-lg border-2 py-3 px-4 border-slate-800 mt-5 font-medium'> Make your 1st Booking</button></Link>
                <hr className='my-4'></hr>
                <h1 className='text-lg font-medium mb-20'>Confused to find the Homestay? Contact Us</h1>
                </> ):<></>}
                
                { selectedTab == 3 ? (wishlistProperties.length > 0 ? wishlistProperties.map(prop => <WishListCard property={prop}/>) : <>
                <h1 className='md:text-3xl font-bold mt-20 underline underline-offset-8 decoration-1'>No WishList yet!</h1>
                <Link to="/"><button className='rounded-lg border-2 py-3 px-4 border-slate-800 mt-5 font-medium'> Add properties to your wishlist </button></Link>
                <hr className='my-4'></hr>
                <h1 className='text-lg font-medium mb-20'>Confused to find the Homestay? Contact Us</h1>
                </> ):<></>}
                {/* {selectedTab == 1 && currentOrders.map(order => <OrderCard order={order} validity='current'/>)}
                {selectedTab == 2 && pastOrders.map(order => <OrderCard order={order} validity='past'/>)} */}

            </div>

        </div>
        <FooterC/>
    </>
  )
}
