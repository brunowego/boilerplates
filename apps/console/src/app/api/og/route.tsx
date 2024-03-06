import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: NextRequest): Promise<ImageResponse> {
  const { searchParams } = req.nextUrl

  const postTitle = searchParams.get('title')

  const font = fetch(
    new URL('@/assets/fonts/Inter-SemiBold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const fontData = await font

  return new ImageResponse(
    <div
      style={{
        alignItems: 'flex-start',
        backgroundImage: 'url(https://leerob.io/og-bg.png)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          color: 'white',
          display: 'flex',
          fontFamily: 'Inter',
          fontSize: 130,
          fontStyle: 'normal',
          letterSpacing: '-0.05em',
          lineHeight: '120px',
          marginLeft: 190,
          marginRight: 190,
          whiteSpace: 'pre-wrap',
        }}
      >
        {postTitle}
      </div>
    </div>,
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}
