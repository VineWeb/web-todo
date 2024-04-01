function ChildrenCom (props: any) {
  console.log(props)
  return (
    <div>{props.name}</div>
  )
}
function ParentCom () {
  return (
    <>
      <div>父元素</div>
      <ChildrenCom name="父元素传递过来的值" />
    </>
  )
}
export default ParentCom
