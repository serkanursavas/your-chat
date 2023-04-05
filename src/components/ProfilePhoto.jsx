const ProfilePhoto = props => {
  return (
    <img
      className={`object-cover w-${props.size} h-${props.size} bg-center bg-cover rounded-full select-none`}
      src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1200"
      alt=""
    />
  )
}

export default ProfilePhoto
