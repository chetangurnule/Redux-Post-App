import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButton from './ReactionButton'

const SinglePostPage = () => {
  const { postId } = useParams()
  const posts = useSelector(selectAllPosts)
  const currentPost = posts.find((post) => post.id === postId)

  if (!currentPost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post-excerpt">
        <h2>{currentPost.title}</h2>
        <PostAuthor userId={currentPost.user} />
        <p className="post-content">{currentPost.content}</p>
        <ReactionButton post={currentPost} />
        <Link to={`/editPost/${currentPost.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
