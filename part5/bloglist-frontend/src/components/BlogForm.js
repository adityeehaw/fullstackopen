import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [Title, setTitle] = useState('')
  const [Author, setAuthor] = useState('')
  const [Url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog ({
      title: Title,
      author: Author,
      url: Url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')

  }


  return (
    <form onSubmit={addBlog}>
      <br/>

      <div>Title:
        <input
          value = {Title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Title'
        />
      </div>

      <div>Author:
        <input
          value = {Author}
          onChange = {({ target }) => setAuthor(target.value)}
          placeholder='Author'
        />
      </div>

      <div>Url:
        <input
          value = {Url}
          onChange = {({ target }) => setUrl(target.value)}
          placeholder='Url'
        />
      </div>
      <br/>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm