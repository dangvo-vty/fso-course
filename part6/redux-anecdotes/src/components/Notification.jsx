import { useSelector  } from "react-redux"

const Notification = () => {
  const message = useSelector(state => state.notification)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  }
  message[0]  ? style.display = '' : style.display = 'none'

  return (
    <div style={style}>
      {message} has added
    </div>
  )
}

export default Notification