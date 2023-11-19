import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import Navbar from '../Components/NavbarC'
import Banner from '../Components/Banner'
import Social from '../Components/Social'
import SearchMobile from '../Components/SearchMobile'
import Listing from '../Components/Listing'
import Reviews from '../Components/Reviews'
import Query from '../Components/Query'
import About from '../Components/About'
import FooterC from '../Components/FooterC'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllProperties } from '../Store/propertySlice'

export default function Home() {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.property.allProperties);
  const [dropdownArray,setDropdownArray] = useState([])


  useEffect(() => {
    dispatch(getAllProperties());
  },[dispatch]);

  useEffect(() => {
    if (properties.length > 0 ) {
      const dropdownArray = properties.map((property) => {
        return {
          title: property.title,
          location: property.location,
          id: property._id,
        };
      });
      console.log(dropdownArray)
      setDropdownArray(dropdownArray);
    }
  }
  ,[properties]);
  
  return (
    <>    
    <Navbar/>
    <Social/>
    <Banner/>
    <Search dropdownArray={dropdownArray}/>
    <SearchMobile />
    <Listing properties={properties}/>
    <Reviews/>
    <Query/>
    <About/>
    <FooterC/>
    </>

  )
}
