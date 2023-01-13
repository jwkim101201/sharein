export default function Home() {
  return (
    <div className='flex flex-col items-center font-mono'>
      <div className='text-center pt-12'>
        <p className='text-3xl'>Sharein</p>
        <p>Easily share your images.</p> <br />
        <div className='w-96 h-48 leading-[12rem] bg-slate-200 border-4 border-dashed border-slate-500'>
          <p className='text-slate-400 select-none'>Drag & drop here (max 64mb)</p>
        </div>
      </div>

      <div className='fixed bottom-0'>
        <p>
          Made with <span className='text-red-500'>♥</span> by <a href='https://github.com/kellsthepenguin'>kellsthepenguin</a>
        </p>
      </div>
    </div>
  )
}
