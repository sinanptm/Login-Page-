const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const nocache =require("nocache")
const router =require('./router')
const cookieParser = require("cookie-parser")

app.use(nocache())
app.use(cookieParser())

app.set('view engine', 'ejs')
app.use('/static', express.static(path.join(__dirname, 'views')))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret:"your_long_and_random_secret_here",
  resave:false,
  saveUninitialized:true
}))
app.use("/",router)
app.use((req, res) => {
  res.status(404).send('<section><div><h1>Page Not Found</h1></div></section>');
})

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})


