import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET() {
  const text = 'Hello, Bun!'
  const main = []
  const sixnummain = []
  for (let i = 0; i < 2; i++) {
    const randomNum = Math.floor(Math.random() * 10)
    sixnummain.push(randomNum)
    for (let j = 0; j < 4; j++) {
      const randomNum2 = Math.floor(Math.random() * 10)
      const str = `${randomNum}${randomNum2}`
      main.push(parseInt(str))
    }
  }

  const sixnum = Math.floor(Math.random() * 1000000)

  const strw = sixnum.toString()
  const numIndex = Math.floor(Math.random() * 6)
  const numIndex2 = Math.floor(Math.random() * 6)

  if (numIndex === numIndex2) {
    if (numIndex === 5) {
      numIndex2 - 1
    } else {
      numIndex2 + 1
    }
  }
  const rep = strw.replace(strw[numIndex], sixnummain[0].toString())
  const rep2 = rep.replace(strw[numIndex2], sixnummain[1].toString())

  console.log(strw)
  // โหลดรูปและเขียนข้อความ
  const imageBuffer = await sharp('public/template.jpeg')
    .composite([
      {
        input: Buffer.from(
          `<svg width="500" height="500">
            <text x="120" y="90" font-size="32" fill="white">${sixnummain}</text>
            <text x="120" y="120" font-size="32" fill="white">${main.slice(
              0,
              4
            )}</text>
            <text x="120" y="150" font-size="32" fill="white">${main.slice(
              4
            )}</text>
            <text x="120" y="180" font-size="32" fill="white">${rep2}</text>
          </svg>`
        ),
        top: 0,
        left: 0,
      },
    ])
    .toBuffer()

  return new NextResponse(imageBuffer, {
    headers: { 'Content-Type': 'image/jpeg' },
  })
}
