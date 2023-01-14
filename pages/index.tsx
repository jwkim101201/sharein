import { useState } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

export default function Home() {
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  const [, drop] = useDrop(() => ({
      accept: [NativeTypes.FILE],
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any
        if (item && item.files[0]) {
          const form = new FormData()
          form.append('file', item.files[0])

          fetch('/api/upload', {
            method: 'post',
            body: form
          }).then((res) => res.json()).then((result) => {
            if (!result.ok) {
              return setFileUrl(`err: ${result.error}`)
            }

            setFileUrl(window.location.href + 'f/' + result.id)
          })
        }
      }
    })
  )

  return (
    <div className='flex flex-col items-center font-mono'>
      <div className='text-center pt-12'>
        <p className='text-3xl'>Sharein</p>
        <p>Easily share your images.</p> <br />
        <div ref={drop} className='w-96 h-48 leading-[12rem] bg-slate-200 border-4 border-dashed border-slate-500'>
          <p className='text-slate-400 select-none'>Drag & drop here (max 64mb)</p>
        </div>
        <p>{fileUrl}</p>
      </div>

      <div className='fixed bottom-0'>
        <p>
          Made with <span className='text-red-500'>♥</span> by <a href='https://github.com/kellsthepenguin'>kellsthepenguin</a>
        </p>
      </div>
    </div>
  )
}
