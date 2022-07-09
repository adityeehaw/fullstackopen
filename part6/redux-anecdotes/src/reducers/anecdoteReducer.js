import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const getAnecdote = state.find(a => a.id === id)
      const changeVote = {
        ...getAnecdote,
        votes: getAnecdote.votes + 1
      }
    
    return state.map(anecdote => anecdote.id !== id ? anecdote : changeVote).sort((a,b) => b.votes - a.votes)
    }
    case 'CREATE':{
    return state.concat(action.data)
    }
    case 'INITIAL': {
      state = action.data.sort((a,b) => b.votes - a.votes)
    return state
    }
    default:
      return state
  }
}

export const create = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createnew(content)
    dispatch({
      type: 'CREATE',
      data: newAnec
    })

  }
}

export const makeVote = (id) => {
  console.log('vote', id)
  return async dispatch => {
    const voted = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: voted
    })

  }
}

export const initializeAnecdotes = (anecdotesList) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIAL',
      data: anecdotes
    })
  }
}

export default reducer