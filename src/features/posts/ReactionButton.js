import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const ReactionButton = ({ post }) => {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(
    ([reactionName, emoji], i) => {
      return (
        <button
          key={post.id + i}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(reactionAdded({ id: post.id, reaction: reactionName }))
          }
        >
          {emoji}
          {post.reactions[reactionName]}
        </button>
      )
    },
  )

  return <div>{reactionButtons}</div>
}

export default ReactionButton
