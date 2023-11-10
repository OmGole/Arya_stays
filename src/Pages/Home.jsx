import React from 'react'
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

export default function Home() {
  return (
    <>    
    <Navbar/>
    <Social/>
    <Banner/>
    <Search/>
    <SearchMobile />
    <Listing/>
    <Reviews/>
    <Query/>
    <About/>
    <FooterC/>
    </>

  )
}
