import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded, postUpdated } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { selectAllUsers } from '../users/userSlice'
import { useHistory } from 'react-router-dom'

const AddPostForm = ({ editPost }) => {
  const [title, setTitle] = useState(editPost ? editPost.title : '')
  const [content, setContent] = useState(editPost ? editPost.content : '')
  const [userId, setUserId] = useState(editPost ? editPost.user : '')
  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const onContentChange = (event) => {
    console.log(event.target.value)
    setContent(event.target.value)
  }

  const onAuthorChanged = (event) => {
    console.log(event.target.value)
    setUserId(event.target.value)
  }

  const onSubmit = () => {
    if (editPost && title && content) {
      dispatch(
        postUpdated({
          ...editPost,
          title: title,
          content: content,
          user: userId,
        }),
      )
      history.push(`/posts/${editPost.id}`)
    }

    if (!editPost && title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
          user: userId,
          date: new Date().toISOString(),
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
        }),
      )
    }

    setTitle('')
    setContent('')
    setUserId('')
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const users = useSelector(selectAllUsers)
  const usersOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>{editPost ? 'Edit Post' : 'Add a New Post'}</h2>
      <form action="">
        <label htmlFor="postTitle">Post Title : </label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content : </label>
        <textarea
          name="postContent"
          id="postContent"
          cols="30"
          rows="10"
          value={content}
          onChange={onContentChange}
        ></textarea>
        <button type="button" onClick={onSubmit} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
