// import { useSelector, useDispatch } from 'react-redux'
// import {create, makeVote} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'





const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  // const addAnecdote = (e) => {
  //   e.preventDefault()
  //   const content = e.target.anecdote.value
  //   dispatch(create(content))
  // }

  // const vote = (id) => {
  //   dispatch(makeVote(id))
  // }

  return (
    <div>
      {/* <h2>Anecdotes</h2>
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
      )} */}
      {/* <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name = "anecdote"/></div>
        <button type = "submit">create</button>
      </form> */}
      <h1>Anecdotes</h1>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App