import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => { dispatch(initializeAnecdotes())})
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App