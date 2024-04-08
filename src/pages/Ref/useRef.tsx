import { useEffect, useRef } from 'react';
function MyRef () {
  const myRef = useRef()
  useEffect(() => {
    console.log(myRef.current)
  }, [])
  return (
    <>
      <div ref={myRef}>122</div>
    </>
  )
}

export default MyRef