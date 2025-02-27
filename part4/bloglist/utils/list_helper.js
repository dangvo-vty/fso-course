const dummy = (blogs) => {
  return 1;
}

const sumLike = (blogs) => {
    if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        return blogs.reduce( (sum,blog) => sum + blog.likes,0)
    }
}

const favorite = (blogs) => {
    topLikes = Math.max(...blogs.map(p => p.likes))
    return blogs.find(p => p.likes === topLikes)
}

module.exports = {
    dummy,
    sumLike,
    favorite
}