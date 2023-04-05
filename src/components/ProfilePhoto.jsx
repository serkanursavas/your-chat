const ProfilePhoto = props => {
  return (
    <img
      className={`object-cover w-${props.size} h-${props.size} bg-center bg-cover rounded-full select-none`}
      src={props.profilePhoto}
      alt=""
    />
  )
}

export default ProfilePhoto
