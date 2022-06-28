import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(create(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>

    )

}

export default AnecdoteForm