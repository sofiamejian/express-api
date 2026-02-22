"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// In-memory storage
let posts = [];
let currentId = 1;
// GET /posts
app.get("/posts", (req, res) => {
    res.json(posts);
});
// POST /posts
app.post("/posts", (req, res) => {
    const { imageUrl, title, description } = req.body;
    if (!imageUrl || !title || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const newPost = {
        id: currentId++,
        imageUrl,
        title,
        description,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});
// DELETE /posts/:id
app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter((post) => post.id !== id);
    res.json({ message: "Post deleted successfully" });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
