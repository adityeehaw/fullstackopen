const res = require("express/lib/response")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    let likes = 0
    array.forEach(element => { likes += element.likes})

    return likes
}

const favoriteBlog = (array) => {
    let mostlikes = 0
    array.forEach(element => { element.likes > mostlikes ? mostlikes = element.likes : mostlikes = mostlikes})
    const res = array.find(element => element.likes === mostlikes)
    delete res._id
    delete res.__v
    delete res.url
    return res
}

const mostBlogs = (array) => {
    let some = {}
    array.forEach(element => {some.hasOwnProperty(element.author) ? some[element.author] += 1 : some[element.author] = 1})
    let arr = []
    for (const [author, blogs] of Object.entries(some)) {
    arr.push({author, blogs})
    }
    // console.log(arr)

    let res = Math.max(...arr.map(el => el.blogs))
    // console.log(res)

    const index = Object.values(some).indexOf(res)
    // console.log(ind)
    let ans = arr[index]
    // console.log(ans)
    return ans
}

const mostLikes = (array) => {
    let some = {}
    array.forEach(element => {some.hasOwnProperty(element.author) ? some[element.author] += element.likes : some[element.author] = element.likes})
    let arr = []
    for (const [author, likes] of Object.entries(some)) {
    arr.push({author, likes})
    }
    // console.log(arr)
    let res = Math.max(...arr.map(el => el.likes))
    // console.log(res)

    const index = Object.values(some).indexOf(res)
    // console.log(ind)
    let ans = arr[index]
    // console.log(ans)
    return ans
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}