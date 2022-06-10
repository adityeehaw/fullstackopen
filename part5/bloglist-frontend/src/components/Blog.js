import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog, user, blogs, setBlogs}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  // const [removeButtonVisibility, setRemoveButtonVisibility] = useState('')

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

  // const removeCalc = async () => {
  //   let style = 'none'

  //   await blogService.getAll()  
    // this is added because the "remove" button was not visible for the blog that was just added, 
  //   // after reload the "remove" button was visible. This is because the blog that is returned from the post request does not have 
  //   // user-id at "blog.user.id", it gives the user-id at "blog.user". Where as on the blogs that we get from the database the 
  //   // user-id is at "blog.user.id".


  //   if (user.id === (blog.user?.id || 'no')) {
  //     style = ''
  //   }else{
  //     style = 'none'
  //   }
  //   return ({display : style})
  // }

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

  const likeCheck = async() => {
    console.log('send')
    const updatedblog = {...blog,likes: likes + 1}
    setLikes(likes + 1)
    
    await blogService.update(updatedblog,blog.id)
  }



  return(
  <div style={blogStyle}>
    <div style={hideWhenVisible} >
      <p>'<b>{blog.title}</b>' by '{blog.author}' <button onClick={toggleVisibility}>View</button></p>
    </div>

    <div style={showWhenVisible}>
      <p>Title: {blog.title} <button onClick={toggleVisibility}>hide</button></p>
      <p>Url: {blog.url} </p>
      <p>Likes: {likes} <button onClick={likeCheck}>like</button></p>
      <p>Author: {blog.author} <button style={removeAvailabilityCheck} onClick={removeBlog}>remove</button></p>
    </div>
    
  </div>  
  )
}

export default Blog