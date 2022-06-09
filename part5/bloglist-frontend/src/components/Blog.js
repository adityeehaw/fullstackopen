import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontSize: 20,
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const likeCheck = async (blog) => {
    const updatedblog = {likes: likes + 1}
    console.log(blog.id)
    await blogService.update(updatedblog,blog.id)

    setLikes(likes + 1)
  }

  return(
  <div style={blogStyle}>
    <div style={hideWhenVisible} >
      <p>'<b>{blog.title}</b>' by '{blog.author}' <button onClick={toggleVisibility}>View</button></p>
    </div>

    <div style={showWhenVisible}>
      {likes}
      <p>Title: {blog.title} <button onClick={toggleVisibility}>hide</button></p>
      <p>Author: {blog.author}</p>
      <p>Url: {blog.url} </p>
      <p>Likes: {blog.likes} <button onClick={likeCheck}>like</button></p>
    </div>
    
  </div>  
  )
}

export default Blog