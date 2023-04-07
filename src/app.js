import express from "express";

const app = express();
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  const newUser = {
    username,
    avatar
  };
  
  users.push(newUser);
  res.send('OK');
});

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;

  if (users.find(user => user.username !== username)) {
    res.status(401).send("UNAUTHORIZED");
    return;
  }

  const newTweet = {
    username,
    tweet
  };

  tweets.push(newTweet);
  res.status(201).send("OK");
});



const PORT = 5000;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));