const Layout = props => {
  return (
    <div className="w-[100vw]  h-[100vh] md:w-[900px] md:h-[600px] overflow-hidden mx-auto rounded-md window-shadow grid grid-cols-1 md:grid-cols-3 ">
      {props.children}
    </div>
  )
}

export default Layout
