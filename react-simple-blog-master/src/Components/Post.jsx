import React from "react";
import ReactMarkdown from "react-markdown"

const Post = ({ title, content, shortDescription, , id }) => {
  return (
    <>
      <section className="post-container">
        <h2>{title}</h2>
        <br />
        <h3><b>
        Short Description</b>
        </h3>
        <p> {shortDescription}</p>
        <h3><b>
        Content </b>
        </h3>
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
       
      </section>
    </>
  );
};
export default Post;
