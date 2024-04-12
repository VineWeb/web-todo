import React from "react";
function HOC<T>(WrappedComponent: React.ComponentType<T>) {
  return class HOCCom extends React.Component<T> {
    constructor (props: T | Readonly<T>) {
      console.log('HOCCom', props)
      super(props)
      this.state = {
        name: 'HOC组件',
        age: 18
      }
    }
    render(): React.ReactNode {
        return (
          <WrappedComponent {...this.props} data={this.state}></WrappedComponent>
        )
    }
  }
}
interface PcomProps {
  a: number;  // 注意这里的类型应该与传入的 `a` 属性类型一致
  data?: {
    name: string;
    age: number;
  };
}
class Pcom extends React.Component<PcomProps> {
  constructor(props: PcomProps | Readonly<PcomProps>) {
    super(props)
  }
  render() {
    const { a, data = { name: "默认值", age: 0 } } = this.props;
    return <div style={{background: 'skyblue'}}>
      <div>这是HOC的组件示例</div>
      <div>a: {a}</div>
      <div>name: {data.name}</div>
      <div>age: {data.age}</div>
    </div>
  }
}
export default HOC(Pcom)