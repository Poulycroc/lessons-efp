const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 9999;

const serviceAccount = require('./config/test-auth-ce9a4-firebase-adminsdk-u9qsn-8b6a6937c8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(express.json());

app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

