const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const admin = require("firebase-admin");

const serviceAccount = require("./config/test-auth-ce9a4-firebase-adminsdk-u9qsn-8b6a6937c8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function checkAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send('Unauthorized')
  }

  admin
    .auth()
    .verifyIdToken(req.headers.authorization)
    .then(() => next())
    .catch(() => res.status(403).send('Unauthorized'));
}

app.get('/secret', checkAuth, (req, res) => {
  res.json({ message: 'secret information' })
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(9999, () => {
  console.log(`App running on localhost:9999`)
});
