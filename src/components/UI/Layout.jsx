const Layout = props => {
  return (
    <div className="w-[75vw] h-[75vh] overflow-hidden rounded-md window-shadow flex relative">{props.children}</div>
  )
}

export default Layout
