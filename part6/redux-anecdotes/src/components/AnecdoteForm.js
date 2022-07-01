import { create } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationShow } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(create(content))
        dispatch(notificationShow(`${content} added`))
        setTimeout(() => dispatch(notificationRemove()), 5000)
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