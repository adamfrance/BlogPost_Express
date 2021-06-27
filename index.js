const express = require('express')
const flash = require('connect-flash')
const app = express()
const ejs = require('ejs')


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aaa:aaa@cluster0.jq2sp.mongodb.net/my_database', { useNewUrlParser: true })
const fileUpload = require('express-fileupload')
app.use(flash())

app.use(fileUpload())

app.set('view engine', 'ejs')
app.use(express.static('public'))
let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
})

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleWare = require('./middleware/validationMiddleware')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')



app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.use('/posts/store', validateMiddleWare)

app.get('/', homeController)

app.get('/posts/new', authMiddleware, newPostController)

app.get('/post/:id', getPostController)

app.get('/auth/register', newUserController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'));