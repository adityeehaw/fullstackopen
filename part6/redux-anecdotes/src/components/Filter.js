// import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { filterIt } from "../reducers/filterReducer"

const Filter = (props) => {

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      props.filterIt(event.target.value)
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
  
const mapDispatchToProps = {
  filterIt
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter