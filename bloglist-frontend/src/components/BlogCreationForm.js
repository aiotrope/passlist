import { useState } from "react";

export const BlogCreationForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleChangTitle = (event) => {
    event.persist();
    const target = event.target.value;
    setTitle(target);
  };
  const handleChangAuthor = (event) => {
    event.persist();
    const target = event.target.value;
    setAuthor(target);
  };
  const handleChangUrl = (event) => {
    event.persist();
    const target = event.target.value;
    setUrl(target);
  };
  const addBlog = async (event) => {
    if (event) event.preventDefault();
    const userInput = { title, author, url };
    setTitle("");
    setAuthor("");
    setUrl("");
    createBlog(userInput);
  };

  return (
    <form onSubmit={addBlog}>
      <label htmlFor="title">
        title:
        <input type="text" value={title} onChange={handleChangTitle} />
      </label>
      <div>
        <label htmlFor="author">
          author:
          <input type="text" value={author} onChange={handleChangAuthor} />
        </label>
      </div>

      <div>
        <label htmlFor="url">
          url:
          <input type="text" value={url} onChange={handleChangUrl} />
        </label>
      </div>

      <button type="submit">create</button>
    </form>
  );
};
