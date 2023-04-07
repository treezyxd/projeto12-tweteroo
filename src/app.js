import express from "express";

const app = express();
app.use(express.json());

const users = [];

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  const newUser = {
    username: username,
    avatar: avatar
  };
  
  users.push(newUser);
  res.send('OK');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));