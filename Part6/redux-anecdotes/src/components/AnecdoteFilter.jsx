import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      const filterValue = event.target.value;
      if(filterValue == '') return
      dispatch({type: 'filter/setFilter', payload: filterValue})
    }

    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  export default Filter