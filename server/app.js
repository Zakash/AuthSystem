const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  mongoose = require("mongoose"),
  config = require("./config"),
  User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoURL,
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));


app.post('/register', (req,res) => {
  const newUser = new User({
    name: req.body.fullName,
    email: req.body.email
  });

  newUser.password = newUser.generateHash(req.body.password);
  newUser.save().then(rec => {
    res.status(201).json(rec);
  })
});

app.post('/login', (req,res) => {
  User.findOne({email: req.body.email}).then(loginUser => {
    if(!loginUser) {
      return res.status(401).json({message: 'Invalid username or password'});
    };

    if (!loginUser.validatePassword(req.body.password)) {
      return res.status(401).json({message: 'Invalid username or password'});
    };
    res.status(200).json(loginUser);
  });
});

app.get('/users', (req,res) => {
  User.find().then(rec => {
    res.status(200).json(rec);
  })
})

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(3000, () => console.log("listen on port 3000"));
