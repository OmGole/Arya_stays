import React from 'react'
import { Carousel } from 'flowbite-react';
import sl1 from '../Resources/sl1.png';
import sl2 from '../Resources/sl2.png';
import sl3 from '../Resources/sl3.png';


export default function Slide() {
  return (
    <div>
        <div className="h-96 sm:h-96 xl:h-96 2xl:h-96">
      <Carousel className='bg-slate-100'>
        <div className=" h-full  dark:text-white">
            <div className='flex '>
                <div className='w-1/3  justify-center '>
                    <img src={sl1} className='h-1/2'/>
                </div>
                <div className='w-1/3  justify-center  '>
                <img src={sl2} className='h-1/2'/>
                </div>
                <div className='w-1/3  justify-center  '>
                <img src={sl3} className='h-1/2'/>
                </div>

            </div>
            <div>
                <p>Step out to explore some of Alibaug’s beloved spots such as The Deli (750 m), Cafe Bohemyan Blue (1.3 km), Kiki’s Restaurant (6.6 km), Suju’s Artcafe (3.7 km), and The Backyard Cafe (8.9 km). Explore the coastal beauty of Alibaug at Khimi Beach (3.5 km), Thal Beach (8 km), and Alibaug Beach (11 km).</p>
                <p>Take a trekking towards the forest, walk down to the water falls and enjoy to the fullest. And also you can watch birds, animals while on trekking. Take a trekking towards the forest, walk down to the water falls and enjoy to the fullest. And also you can watch birds, animals while on trekking.</p>
            </div>
            
        </div>
        <div className=" h-3/4 dark:text-white">
            <div className='flex flex-wrap h-3/4'>
                <div className='flex-1 flex justify-end h-3/4'>
                <img src={sl1} className='h-3/4' />
                </div>
                <div className='flex-1 flex justify-center h-3/4 '>
                <img src={sl1} className='h-3/4'/>
                </div>
                <div className='flex-1 flex justify-start h-3/4 '>
                <img src={sl1} className='h-3/4'/>
                </div>

            </div>
            <div className='md:mx-20'>
                <p>Step out to explore some of Alibaug’s beloved spots such as The Deli (750 m), Cafe Bohemyan Blue (1.3 km), Kiki’s Restaurant (6.6 km), Suju’s Artcafe (3.7 km), and The Backyard Cafe (8.9 km). Explore the coastal beauty of Alibaug at Khimi Beach (3.5 km), Thal Beach (8 km), and Alibaug Beach (11 km).</p>
            </div>
            
        </div>
        <div className=" h-full  dark:text-white">
            <div className='flex flex-wrap'>
                <div className='flex-1'>
                    IMG1
                </div>
                <div className='flex-1'>
                    IMG2
                </div>
                <div className='flex-1'>
                    IMG3
                </div>

            </div>
            <div>
                <p>Step out to explore some of Alibaug’s beloved spots such as The Deli (750 m), Cafe Bohemyan Blue (1.3 km), Kiki’s Restaurant (6.6 km), Suju’s Artcafe (3.7 km), and The Backyard Cafe (8.9 km). Explore the coastal beauty of Alibaug at Khimi Beach (3.5 km), Thal Beach (8 km), and Alibaug Beach (11 km).</p>
                <p>Take a trekking towards the forest, walk down to the water falls and enjoy to the fullest. And also you can watch birds, animals while on trekking. Take a trekking towards the forest, walk down to the water falls and enjoy to the fullest. And also you can watch birds, animals while on trekking.</p>
            </div>
            
        </div>
      </Carousel>
    </div>
    </div>
  )
}
