import { useState, useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import { LoginForm } from "./components/LoginForm";
import { BlogCreationForm } from "./components/BlogCreationForm";
import { Notification } from "./components/Notification";
import { Togglable } from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [counter, setCounter] = useState(0);

  const blogCreationFormRef = useRef();

  const isComponentMounted = useRef(true);

  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser && currentUser.token) {
          const response = await blogService.getAll();

          if (isComponentMounted) {
            setUser(currentUser);
            setBlogs(response);
            setCounter((counter) => counter + 1);
          }
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response.data.error);
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          setErrorMessage(null);
          handleLogout();
          window.location.reload();
        }, 5000);
      }
    };

    getBlogs();
  }, [counter]);

  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
    localStorage.clear();
    window.location.reload();
  };

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject);
      if (response && isComponentMounted) {
        setBlogs(blogs.concat(response));
        setSuccessMessage(response.message);
        setCounter((counter) => counter + 1);
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          setSuccessMessage(null);
          blogCreationFormRef.current.toggleVisibility();
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        setErrorMessage(null);
        setCounter((counter) => counter + 1);
        window.location.reload();
        blogCreationFormRef.current.toggleVisibility();
      }, 2000);
    }
  };

  const loginRelatedComponent = () => (
    <div>
      <Notification error={errorMessage} success={successMessage} />
      <LoginForm
        user={user}
        setUser={setUser}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setCounter={setCounter}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        isComponentMounted={isComponentMounted}
      />
    </div>
  );

  const blogCreationFormComponent = () => (
    <Togglable
      buttonLabel="create new blog"
      close="cancel"
      ref={blogCreationFormRef}
    >
      <h2>create new</h2>
      <BlogCreationForm createBlog={addBlog} />
    </Togglable>
  );

  const blogsDescByLikes = blogs.sort((a, b) => b.likes - a.likes);

  const blogRelatedComponent = () => (
    <div>
      <h2>blogs</h2>
      <Notification error={errorMessage} success={successMessage} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <div>{blogCreationFormComponent()}</div>

      {blogsDescByLikes.map((blog, idx) => (
        <Blog
          key={idx}
          blog={blog}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setCounter={setCounter}
          isComponentMounted={isComponentMounted}
        />
      ))}
    </div>
  );

  return user !== null ? blogRelatedComponent() : loginRelatedComponent();
};

export default App;
