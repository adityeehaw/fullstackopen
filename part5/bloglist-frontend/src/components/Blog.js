import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs, likeUpdate }) => {
  const [visible, setVisible] = useState(false)

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

  let removeAvailabilityCheck = { display: user.id === (blog.user?.id || blog.user || 'no') ? '' : 'none' }

  const removeBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(newBlogs)
      await blogService.remove(blog.id)
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeCheck = () => {
    const updatedblog = { ...blog,likes: blog.likes + 1 }

    likeUpdate(updatedblog, blog.id)
  }



  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="titleAuthor" >
        <p>`<b>{blog.title}</b>` by `{blog.author}`` <button onClick={toggleVisibility}>View</button></p>
      </div>

      <div style={showWhenVisible} className="urlLikes">
        <p>Title: {blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>Url: {blog.url} </p>
        <p>Likes: {blog.likes} <button onClick={likeCheck}>like</button></p>
        <p>Author: {blog.author} <button style={removeAvailabilityCheck} onClick={removeBlog}>remove</button></p>
      </div>

    </div>
  )
}

export default Blog