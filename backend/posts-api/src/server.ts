import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Post type
interface Post {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

// In-memory storage
let posts: Post[] = [];
let currentId = 1;

// GET /posts
app.get("/posts", (req: Request, res: Response) => {
  res.json(posts);
});

// POST /posts
app.post("/posts", (req: Request, res: Response) => {
  const { imageUrl, title, description } = req.body;

  if (!imageUrl || !title || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newPost: Post = {
    id: currentId++,
    imageUrl,
    title,
    description,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// DELETE /posts/:id
app.delete("/posts/:id",(req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id);

    posts = posts.filter((post) => post.id !== id);

    res.json({ message: "Post deleted successfully" });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});