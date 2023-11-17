import React from 'react'
import { Carousel } from 'flowbite-react'

import sl1 from '../Resources/sl1.png';
import sl2 from '../Resources/sl2.png';
import sl3 from '../Resources/sl3.png';

export default function Slide2() {
  return (
    <div>
        <div className="h-96 sm:h-96 xl:h-96 2xl:h-96">
      <Carousel className='bg-slate-600'>
        <div className="h-full dark:text-white">
            <div className='flex'>
                <div className='flex'>
                    <div className='w-full sm:w-1/3 justify-center'>
                        {/* Image 1 */}
                        <img src={sl1} className='w-full h-auto sm:h-1/2' alt='Image 1' />
                        {/* Description */}
                        <p className='mt-2 sm:hidden'>Description for Image 1</p>
                    </div>
                    <div className='w-full sm:w-1/3 justify-center'>
                        {/* Image 2 */}
                        <img src={sl2} className='w-full h-auto sm:h-1/2 hidden sm:block' alt='Image 2' />
                        {/* Description */}
                        <p className='mt-2 sm:hidden'>Description for Image 2</p>
                    </div>
                    <div className='w-full sm:w-1/3 justify-center'>
                        {/* Image 3 */}
                        <img src={sl3} className='w-full h-auto sm:h-1/2 hidden sm:block' alt='Image 3' />
                        {/* Description */}
                        <p className='mt-2 sm:hidden'>Description for Image 3</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="h-3/4 dark:text-white">
          <div className='flex flex-wrap h-3/4'>
          <div className='flex'>
  <div className='w-full sm:w-1/3 justify-center'>
    {/* Image 1 */}
    <img src={sl1} className='w-full h-auto sm:h-1/2' alt='Image 1' />
    {/* Description */}
    <p className='mt-2 sm:hidden'>Description for Image 1</p>
  </div>
  <div className='w-full sm:w-1/3 justify-center'>
    {/* Image 2 */}
    <img src={sl2} className='w-full h-auto sm:h-1/2 hidden sm:block' alt='Image 2' />
    {/* Description */}
    <p className='mt-2 sm:hidden'>Description for Image 2</p>
  </div>
  <div className='w-full sm:w-1/3 justify-center'>
    {/* Image 3 */}
    <img src={sl3} className='w-full h-auto sm:h-1/2 hidden sm:block' alt='Image 3' />
    {/* Description */}
    <p className='mt-2 sm:hidden'>Description for Image 3</p>
  </div>
</div>
          </div>
        </div>
        <div className="h-full dark:text-white">
          <div className='flex flex-wrap'>
          <div className='flex'>
  <div className='w-full sm:w-1/3 justify-center'>
    {/* Image 1 */}
    <img src={sl1} className='w-full h-auto sm:h-1/2' alt='Image 1' />
    {/* Description */}
    <p className='mt-2 sm:hidden'>Description for Image 1</p>
  </div>
  <div className='w-full sm:w-1/3 justify-center'>
    {/* Image 2 */}
    <img src={sl2} className='w-full h-auto sm:h-1/2 hidden sm:block' alt='Image 2' />
    {/* Description */}
    <p className='mt-2 sm:hidden'>Description for Image 2</p>
  </div>
  <div className='w-full sm:w-1/3 justify-center'>
    {/* Image 3 */}
    <img src={sl3} className='w-full h-auto sm:h-1/2 hidden sm:block' alt='Image 3' />
    {/* Description */}
    <p className='mt-2 sm:hidden'>Description for Image 3</p>
  </div>
</div>
          </div>
        </div>
      </Carousel>
    </div>
    </div>
  )
}
