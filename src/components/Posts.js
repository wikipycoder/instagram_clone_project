import React from "react";
import './posts.css';
import Avatar from '@material-ui/core/Avatar';


function Posts({ username, caption, imgUrl, alt}) {
  const nickName = username.length >= 3 ?  username.slice(0, 3) : username[0];
  console.log("I'm username: " + username);
  return (

    <div className="post">

        <div className="post__header">

          <Avatar className="post__avatar" 
            alt={ alt }
            src=""
          >{ nickName }</Avatar>
          <h5>{ username }</h5>

        </div>
        
        <div className="post__footer">
          <img src={ imgUrl } alt={ alt } className="post__img" />
          <h6>{ username }: { caption }</h6>
        </div>

        <div className="post__comment">

          { /*posting comments */}
          <form>
            <input 
              type="text"
              
              placeholder="Add a comment..."
              className="comment__text"
            />
            <input type="submit" value="Post" className="comment__btn" />
          </form>

        </div>
        
    </div>
  );
}

export default Posts;

