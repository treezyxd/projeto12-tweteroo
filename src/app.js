import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  const newUser = {
    username,
    avatar
  };

  if(!username || !avatar) {
    res.status(401).send('Todos os campos são obrigatórios!');
    return;
  }

  users.push(newUser);
  res.status(201).send('OK');
  
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

app.get('/tweets', (req, res) => {
  const lastTweets = tweets.slice(-10);

  if(lastTweets.length > 10) {
    lastTweets = lastTweets.slice(lastTweets.length - 10);
  }

  const avatars = lastTweets.map(tweet => {
    const user = users.find(user => user.username === tweet.username);
    const avatar = user ? user.avatar : null;
    return { ...tweet, avatar, username: tweet.username, tweet: tweet.tweet };
  });

  res.status(200).send(avatars);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));