import React from "react"
interface IProps {
  callback: ({
    x2,
    y2,
    z2
  }: {
    x2: number,
    y2: number,
    z2: number
  }) => React.ReactNode,
  x: number,
  y: number
}
interface IState {
  x2: number;
  y2: number;
  z2: number;
}

class RenderCom extends React.Component<IProps, IState> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props)
    this.state = {
      x2: 200,
      y2: 200,
      z2: 300
    }
  }
  render(): React.ReactNode {
    console.log(this.props, this.state)
      return (
        <div style={{background: 'orange', marginTop: '20px'}}>
          <div>这是通过this.props.fn()进行传值</div>
          <div>{this.props.callback(this.state)}</div>
        </div>
      )
  }
}


export default RenderCom