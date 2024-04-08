import React from 'react';
class MyRef extends React.Component{
  constructor (props: any) {
    super(props)
    this.myRef = React.createRef()
  }
  componentDidMount() {
    console.log(this.myRef.current)
  }
  render() {
      return <>
        <div ref={this.myRef}>122</div>
      </>
  }
}

export default MyRef