const ProfilePhoto = props => {
  return (
    <div
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`
      }}
    >
      <img
        style={{
          width: `${props.size}px`,
          height: `${props.size}px`
        }}
        className={`object-cover bg-center bg-cover rounded-full select-none`}
        src={props.profilePhoto}
        alt=""
      />
    </div>
  )
}

export default ProfilePhoto
