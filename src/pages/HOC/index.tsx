import HOCCOM from './hoc'
import RenderCom from './props.fn'

function App () {
  const renderCallback = ({x2, y2, z2}: {x2: number, y2: number, z2: number}) => (
    <>
    <div>x2: {x2}</div>
    <div>y2: {y2}</div>
    <div>z2: {z2}</div>
  </>
  )
  return (
    <>
      <HOCCOM a={100} />
      <RenderCom x={100} y={100} callback={renderCallback} />
    </>
  )
}

export default App