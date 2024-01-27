import { useParams } from 'react-router-dom'
import AddPostForm from './AddPostForm'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const posts = useSelector(selectAllPosts)
  const editPost = posts.find((post) => post.id === postId)
  return <AddPostForm editPost={editPost} />
}

export default EditPostForm
