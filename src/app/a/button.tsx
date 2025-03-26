'use client'
import React from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function Button() {
  const [img, setImg] = React.useState('')
  const fetchImage = async () => {
    const response = await axios.get('/api/img', {
      responseType: 'arraybuffer', // อ่านเป็น Buffer
    })

    // แปลง arraybuffer เป็น Blob
    const blob = new Blob([response.data], { type: 'image/jpeg' })
    const imageUrl = URL.createObjectURL(blob) // สร้าง URL จาก Blob
    setImg(imageUrl) // ตั้งค่า URL ให้ state img
  }

  return (
    <div>
      <button
        className='flex justify-center items-center bg-white rounded-3xl text-amber-400'
        onClick={fetchImage}>
        Click me
      </button>

      {img && (
        <Image
          src={img}
          alt='Fetched Image'
          width={500}
          height={500}
        />
      )}
    </div>
  )
}
