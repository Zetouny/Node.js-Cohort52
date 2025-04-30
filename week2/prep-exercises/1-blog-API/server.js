const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  fs.writeFileSync(title, content);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    res.end("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.end("This post does not exist!");
  }
});

app.get("/blogs/:title", (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.end(post);
  } else {
    res.end("This post does not exist!");
  }
});

app.get("/blogs", (req, res) => {
  const posts = fs.readdirSync(__dirname);
  const postsList = [];

  posts.forEach((post) => {
    const stat = fs.lstatSync(`${__dirname}/${post}`);
    if (stat.isFile() && post.split(".")[1] === undefined) {
      postsList.push({ title: post });
    }
  });

  res.json(postsList);
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
