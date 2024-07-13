'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import './index.css'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'

interface SlideShowMobileProps {
  images: string[]
  title: string
  className?: string
}

export const SlideShowMobile = ({
  images,
  title,
  className
}: SlideShowMobileProps) => {
  return (
    <Swiper
      style={{
        width: '100vw',
        height: '500px'
      }}
      pagination
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
      modules={[FreeMode, Autoplay, Pagination]}
      className={'mySwiper2'}
    >
      {images.map((image) => (
        <SwiperSlide key={image}>
          <Image
            width={600}
            height={500}
            src={`/products/${image}`}
            alt={image}
            className={'object-fill'}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
