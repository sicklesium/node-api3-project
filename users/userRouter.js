const express = require('express');
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).json({ message: "There was an error saving your data to the database." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error saving your data to the database." });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  Posts.insert(req.body)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "There was an error saving your data to the database." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error saving your data to the database." });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "The user ID could not be found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error saving your data to the database." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);

});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json(req.user);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error saving your data to the database." });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(result => {
      if (result) {
        res.status(200).json(req.body);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error saving your data to the database." });
    });
});

//custom middleware
function validateUserId(req, res, next) {
  //do your magic as well!
  const { id } = req.params;
  console.log("This is the ID in the ValidateUserID!", id)
  Users.getById(id)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: "The user ID was invalid." })
      } else {
        req.user = user;
        console.log("This is the user!", req.user)
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error validating the user ID." })
    })
}


function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "You're missing the body!" });
    return true;
  }
  if (!req.body.name) {
    res.status(400).json({ message: "You're missing the head!" });
    return true;
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "You're missing the post body! " })
    return true;
  }
  if (!req.body.text) {
    res.status(400).json({ message: "You're missing the post text!" })
    return true
  }
  next();
}

module.exports = router;