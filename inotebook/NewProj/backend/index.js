const connectToMongo=require('./db');
connectToMongo();
const express = require('express')
var cors=require('cors');
const app = express()
const port = 8000;
app.use(cors());

app.use(express.json());
// Available routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.get('/', (req, res) => {
  res.send('Hello login')
})

app.listen(port, () => {
  console.log(`iNotebook listening on port at http://localhost:${port}`)
})

