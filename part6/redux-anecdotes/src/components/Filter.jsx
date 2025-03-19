import { useDispatch } from "react-redux"
import { filter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handChangle = (event) => {
        dispatch(filter(event.target.value))
    }

    const style = {
        marginBottom: 10
      }
    return (
        <>
        <div style={style}>
            filter <input onChange={handChangle}/>
        </div>
        </>
    )
}

export default Filter