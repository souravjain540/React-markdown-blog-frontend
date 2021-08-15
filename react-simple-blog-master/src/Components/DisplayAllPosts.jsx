import React, { useState, useRef } from "react";
import CreateNewPost from "./CreateNewPost";
import Post from "./Post";
const DisplayAllPosts = () => {
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [allPosts, setAllPosts] = useState([]);
  populateAllPosts(setAllPosts);

  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [shortDescription, setShortDescription]= useState("");
  const getTitle = useRef();
  const getShortDescription= useRef();

  const getContent = useRef();

  const saveShortDescriptionToState = event =>{
    setShortDescription(event.target.value);
  };
  const savePostTitleToState = event => {
    setTitle(event.target.value);
  };
  const savePostContentToState = event => {
    setContent(event.target.value);
  };
  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };
  const savePost = event => {
    event.preventDefault();
    const id = Date.now();
    setAllPosts([...allPosts, { title,shortDescription, content, id }]);
    console.log(allPosts);
    var request = require('request');
    var options = {
      'method': 'POST',
      

      'url': 'http://localhost:3000/api/articles/',
      'headers': {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
        'Content-Type': 'application/json'
      },

      body:JSON.stringify({
        "content": content,
        "shortDescription":shortDescription,
        "title":title
      })

    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
toggleCreateNewPost();
  };
  if (isCreateNewPost) {
    return (
      <>
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          saveShortDescriptionToState={saveShortDescriptionToState}
          getTitle={getTitle}
          getContent={getContent}
          getShortDescription={getShortDescription}
          savePost={savePost}
        />
      </>
    );
  }
  return (
    <>
      {!allPosts.length ? (
        <section className="no-post">
          <h1>No Post Found!</h1>
          <h3>There is nothing to see here.</h3>
          <br />
      <br />
          <section className="button-wrapper">
      <button onClick={toggleCreateNewPost} className="button">Create New</button>
      </section>
        </section>
      ) : (
      <div><h1>All Posts</h1>
        <section className="all-post">
        {allPosts.map(eachPost => {
          return (
            <Post
              id={eachPost.id}
              key={eachPost.id}
              title={eachPost.title}
              shortDescription={eachPost.shortDescription}
              content={eachPost.content}
            />
          );
        })}
      <section className="button-wrapper">
      <button onClick={toggleCreateNewPost} className="button">Create New</button>
      </section>
        </section>
        
        </div>
      )}

      
    </>
  );
};


var populateAllPosts = async function(setAllPosts) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:3000/api/articles/',
    headers: { 
      Authorization: 'Basic YWRtaW46YWRtaW4=',
      'Content-Type': 'application/json'
    }
  };

  await axios(config).then(
    function(response) {
      console.log(response.data)
      setAllPosts(response.data)
    }
  )
};


export default DisplayAllPosts;
