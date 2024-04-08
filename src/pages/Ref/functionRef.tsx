import React from 'react';
class MyRef extends React.Component{
  constructor (props: any) {
    super(props)
    this.myRef = React.createRef()
  }
  componentDidMount() {
    console.log(this.myRef)
  }
  render() {
      return <>
        <div ref={(el) => this.myRef = el}>122</div>
      </>
  }
}

export default MyRef