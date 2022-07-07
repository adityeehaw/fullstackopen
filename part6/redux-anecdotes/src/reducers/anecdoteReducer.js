const anecdotesAtStart = [
  // 'If it hurts, do it more often',
  // 'Adding manpower to a late software project makes it later!',
  // 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  // 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  // 'Premature optimization is the root of all evil.',
  // 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
      const create = asObject(action.data.content)
    
    return [...state, create]
    }
    case 'INITIAL': {
      return action.data
    }
    default:
      return state
  }
}

export const create = (content) => {
  return {
    type: 'CREATE',
    data: {
      content,
    }
  }
}

export const makeVote = (id) => {
  console.log('vote', id)
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INITIAL',
    data: anecdotes
  }
}
export default reducer