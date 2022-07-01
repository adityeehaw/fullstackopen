import { makeVote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notificationShow } from '../reducers/notificationReducer'
import { notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(state.filter)))
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(makeVote(id))
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(notificationShow(`you voted '${anecdote.content}'`))
        setTimeout(() => dispatch(notificationRemove()), 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList