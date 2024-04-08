import React from 'react';
class MyRef extends React.Component{
  constructor (props: any) {
    super(props)
  }
  componentDidMount() {
    console.log(this.refs.myref)
  }
  render() {
      return <>
        <div ref='myref'>122</div>
      </>
  }
}

export default MyRef