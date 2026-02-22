import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";

const API_URL = "https://express-apiserver.onrender.com";

interface Post {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Omit<Post, "id">>({
    imageUrl: "",
    title: "",
    description: "",
  });

  const fetchPosts = async () => {
    const res = await axios.get<Post[]>(`${API_URL}/posts`);
    setPosts(res.data);
  };

  useEffect(() => {
  const loadPosts = async () => {
    const res = await axios.get<Post[]>(`${API_URL}/posts`);
    setPosts(res.data);
  };

    loadPosts();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post(`${API_URL}/posts`, form);
    setForm({ imageUrl: "", title: "", description: "" });
    fetchPosts();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API_URL}/posts/${id}`);
    fetchPosts();
  };

  return (
  <div className="app-container">
    <h1>Posts App</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={(e) =>
          setForm({ ...form, imageUrl: e.target.value })
        }
        required
      />

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        required
      />

      <button type="submit">Create Post</button>
    </form>

    <div className="posts-container">
      {posts.length === 0 ? (
        <p className="empty-state">No posts yet. Create one above</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.imageUrl} alt={post.title} />
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}

export default App;