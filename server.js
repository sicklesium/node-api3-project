const express = require("express");
const server = express();
const userRoutes = require("./users/userRouter");
const postsRoutes = require("./posts/postRouter");

server.use(express.json());

server.listen(5000, () => {
  console.log("\n*** Server running on Port 5000! ***\n");
});


//custom middleware
function logger(req, res, next) {
  console.log(`A ${req.method} was sent at ${Date.now()} to ${req.originalUrl}!`);
  next();
}

server.use(logger);
server.use("/users", userRoutes);
server.use("/posts", postsRoutes);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;