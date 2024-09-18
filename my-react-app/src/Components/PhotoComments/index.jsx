import React, { useContext, useEffect, useRef, useState } from 'react';
//import UserContext from '../../Context/UserContext';
import PhotoCommentsForm from '../PhotoCommentsForm';
import './style.css'; // Importa o CSS

const PhotoComments = (props) => {
  const [comments, setComments] = useState(() => props.comments);
  const commentsSection = useRef(null);
  const { login } = useContext(UserContext);

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <div className="StyledPhotoComments">
      <ul className="comments" ref={commentsSection}>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b> 
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>

      {login && 
        <div className="write-comments">
          <PhotoCommentsForm id={props.id} setComments={setComments}/>
        </div>
      }
    </div>
  );
};

export default PhotoComments;
