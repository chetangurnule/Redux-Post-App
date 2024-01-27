import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'

const PostList = () => {
  const postsList = useSelector(selectAllPosts)
  const posts = postsList.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedList = posts?.map((post, i) => (
    <article className="post-excerpt" key={i + post.id}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButton post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section className="post-list">
      <h2>Posts</h2>
      {renderedList}
    </section>
  )
}

export default PostList
