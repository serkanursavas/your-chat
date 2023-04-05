const Layout = props => {
  return (
    <div className="w-[900px] h-[600px] overflow-hidden mx-auto rounded-md window-shadow grid grid-cols-3 ">
      {props.children}
    </div>
  )
}

export default Layout
