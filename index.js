const express = require('express')
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator')
const session = require('express-session')
const axios = require("axios");
const mongoDb = require("mongodb");

const users = new Map();
users.set('abdu', {firstName: 'Abdu', lastName: 'Sairambay', password: '123'})
users.set('test', {firstName: 'Test', lastName: 'Test', password: '123'})

const apiOptions = {
    headers: {
        'X-RapidAPI-Host': 'unogsng.p.rapidapi.com',
        'X-RapidAPI-Key': 'd5ca66206emsh2d7ae4081e2cbeap1adca1jsn318e1b369063'
    }
};


let mongoClient = new mongoDb.MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true
});

let db
let usersCollection
mongoClient.connect(async function(error, mongo) {
    if (!error) {
        db = mongo.db('assignment');
        //Practice work 1
        /*//let coll = db.collection('users');
        //let res = await coll.find().toArray();
        //let res = await coll.find({salary: 500}).toArray();
        //let res = await coll.find({age: 26}).toArray();
        //let res = await coll.find({salary: 500, age: 26}).toArray();
        //let res = await coll.findOne({salary: 400});
        //let res = await coll.count();
        //let res = await coll.count({age: 26});*/

        //Practice work 2
        usersCollection = db.collection('users');
        //let res = await coll.findOne();
        //let res = await coll.findOne({cost: 300})
        //let res = await coll.findOne({cost: 300, rest: 30})
        //let res = await coll.count()
        //let res = await coll.count({cost: 500})

        //Practice work 3
        // ** 1 **
        /*let res = await coll.find().toArray()
        let priceArray = res.map(product => product.cost)

        console.log(priceArray);*/

        // ** 2 **
        /*let beforeDeleteCount = await coll.count()
        console.log(beforeDeleteCount)
        let  res = await coll.findOneAndDelete({cost: 300})
        let afterDeleteCount = await coll.count()
        console.log(afterDeleteCount)*/

        // ** 3 **
        /*let beforeDeleteCount = await coll.count()
        console.log(beforeDeleteCount)
        let res = await coll.deleteOne({});
        console.log(res)
        let afterDeleteCount = await coll.count()
        console.log(afterDeleteCount)*/

        // ** 4 **
        /*let beforeCollections = db.collections()
        console.log(beforeCollections)
        let res = await db.dropCollection('clothes')
        console.log(res)
        let afterCollections = db.collections()
        console.log(afterCollections)*/

        // ** 5 **
        /*let productsBefore = await coll.find().toArray()
        let priceArrayBefore = productsBefore.map(product => product.cost)
        console.log(priceArrayBefore)
        let res = await coll.findOneAndUpdate({cost: 300}, {$set: {cost: 500}})
        console.log(res)
        let productsAfter = await coll.find().toArray()
        let priceArrayAfter = productsAfter.map(product => product.cost)
        console.log(priceArrayAfter)*/

        // ** 6 **
        /*let productsBefore = await coll.find().toArray()
        let priceArrayBefore = productsBefore.map(product => product.cost)
        console.log(priceArrayBefore)
        let res = await coll.updateMany({}, {$set: {cost: 1000}})
        console.log(res)
        let productsAfter = await coll.find().toArray()
        let priceArrayAfter = productsAfter.map(product => product.cost)
        console.log(priceArrayAfter)*/

        // ** 7 **
       /* let products = await coll.find({cost: {$lt: 500}}).toArray()
        console.log(products)*/

        // ** 8 **
        /*let products = await coll.find({cost: {$gt: 500}}).toArray()
        console.log(products)*/

        // ** 9 **
        /*let usersCollection = db.collection('users')
        let users = await usersCollection.find({age : {$lt: 44}}).toArray()
        console.log(users)*/

        // ** 10 **
        /*let products = await coll.find({cost: {$lte: 500}}).toArray()
        console.log(products)*/

        // ** 11 **
        /*let products = await coll.find({cost: {$gte: 500}}).toArray()
        console.log(products)*/

        // ** 12 **
        /*let products = await coll.find({cost: 500}).toArray()
        console.log(products)*/

        // ** 13 **
        /*let products = await coll.find({cost: {$ne: 500}}).toArray()
        console.log(products)*/

        // ** 14 **
        /*let products = await coll.find({$or: [{cost: 500}, {cost: 600}, {cost: 700}]}).toArray()
        console.log(products)*/

        // ** 15 **
        /*let products = await coll.find({$and: [{cost: {$ne: 100}}, {cost: {$ne: 200}}]}).toArray()
        console.log(products)*/

        // ** 16 **
        /*let res = await coll.deleteMany({cost: {$gt: 300}})
        console.log(res)*/

        // ** 17 **
        /*let res = await coll.deleteMany({$or: [{cost: 100}, {cost: 200}]})
        console.log(res)*/

        // ** 18 **
       /* let res = await coll.find({}).limit(3).toArray()
        console.log(res)*/

        // ** 19 **
        /*let res = await coll.find({}).skip(3).limit(3).toArray()
        console.log(res)*/

        // ** 20 **
        //let res = await coll.find({}).sort({cost: 1}).limit(5).toArray()
        //console.log(res)
    } else {
        //console.error(err);
    }
});


const app = express()
const port = 3000
const cookieParser = require('cookie-parser');
const {ObjectId} = require("mongodb");

app.use(cookieParser());
app.use(session({
    secret: '123',
    saveUninitialized: true,
}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));



const urlEncodedParser = bodyParser.urlencoded({ extended: false })

app.post('/register', urlEncodedParser, [
    check('username', 'This is must be 3+ characters long')
        .exists()
        .isLength({ min: 3 })
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array())
    }


    let username = req.body.username
    console.log(username)
    res.cookie('username', username)
    res.redirect('/register');
})

app.get('/form', (req, res) => {
   res.render('form')
});

app.post('/form', urlEncodedParser, (req, res) => {
    var formName = req.body.formName
    var formCountry = req.body.formCountry
    var formEmail = req.body.formEmail
    res.render('res', {
        name: formName,
        country: formCountry,
        email: formEmail
    })
});



app.get('/register',(req, res) => {
    var val = null
    if (req.session.date)
        val = req.session.date
    else {
        req.session.date = new Date()
    }
    res.render('register', {
        title: 'Мой контакты',
        dateOfSession: val
    })
});

app.get('/session',(req, res) => {
    res.send(req.session.date)
});

app.get('/genres', (req, res) => {
    apiOptions.method = 'GET'
    apiOptions.url = 'https://unogsng.p.rapidapi.com/genres'
    axios.request(apiOptions).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error);
    });
});

app.get('/countries', (req, res) => {
    apiOptions.method = 'GET'
    apiOptions.url = 'https://unogsng.p.rapidapi.com/countries'
    axios.request(apiOptions).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error);
    });
});

app.get('/people/search-by-name', (req, res) => {
    apiOptions.method = 'GET'
    apiOptions.url = 'https://unogsng.p.rapidapi.com/people'
    apiOptions.params = {
        name: req.query.name
    }
    axios.request(apiOptions).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error);
    });
});

app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/admin', async (req, res) => {
    if (!req.session.username) {
        res.render('login', {
            message: "Needs authorization"
        })
    } else {
        let user = await usersCollection.findOne({"username": req.session.username})
        user.lastRequestTime = new Date()

        await usersCollection.findOneAndReplace({_id: user._id}, user)
        let users
        if (req.query.sortBy) {
            let sortBy = req.query.sortBy
            let mySort = sortBy === 'name' ? {name : 1} : {city : 1}
            console.log(mySort)
            users = await usersCollection.find({}).sort(mySort).toArray()
        }else {
            users = await usersCollection.find({}).toArray()
        }
        res.render('admin', {
            users: users
        })
    }
})
app.get('/', async (req, res) => {

    if (req.session.username) {
        let user = await usersCollection.findOne({"username": req.session.username})
        user.lastRequestTime = new Date()
        await usersCollection.findOneAndReplace({_id: user._id}, user)
    }
    res.render('index')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', urlEncodedParser, async (req, res) => {
    let username = req.body.username
    let name = req.body.name
    let password = req.body.password
    let city = req.body.city

    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!password.match(passwordPattern)) {
        res.render('signup.ejs', {
            passwordError: 'Неправильный формат пароля'
        })
    } else {
        let user = {}
        user.username = username
        user.name = name
        user.password = password
        user.city = city
        user.registrationDate = new Date()

        await usersCollection.insertOne(user)

        res.render('login', {
            message: 'Successfully registered'
        })
    }
})

app.get('/update/:id', async (req, res) => {
    if (!req.session.username) {
        res.render('login', {
            message: "Needs authorization"
        })
    } else {
        let id = req.params.id
        console.log(id)
        console.log(id)
        let user = await usersCollection.findOne({_id: new ObjectId(id)})
        res.render('userUpdate', {
            user: user
        })
    }
})

app.post('/users/:id', urlEncodedParser, async (req, res) => {
    if (!req.session.username) {
        res.render('login', {
            message: "Needs authorization"
        })
    } else {
        let id = req.params.id

        let user = await usersCollection.findOne({_id: new ObjectId(id)})
        user.username = req.body.username
        user.name = req.body.name
        user.city = req.body.city
        await usersCollection.findOneAndReplace({_id: user._id}, user)
        res.redirect('/admin')
    }
})

app.get('/addUser', async (req, res) => {
    if (!req.session.username) {
        res.render('login', {
            message: "Needs authorization"
        })
    } else {
        res.render("addUser")
    }
})

app.post('/users-add-new', urlEncodedParser, async (req, res) => {
    if (!req.session.username) {
        res.render('login', {
            message: "Needs authorization"
        })
    } else {
        let username = req.body.username
        let name = req.body.name
        let password = req.body.password
        let city = req.body.city

        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(passwordPattern)) {
            res.render('addUser.ejs', {
                passwordError: 'Неправильный формат пароля'
            })
        } else {
            let user = {}
            user.username = username
            user.name = name
            user.password = password
            user.city = city
            user.registrationDate = new Date()

            await usersCollection.insertOne(user)

            let users = await usersCollection.find({}).toArray()
            res.render('admin', {
                users: users,
                message: 'Successfully registered'
            })
        }
    }
})

app.get('/delete/:id', urlEncodedParser, async (req, res) => {
    if (!req.session.username) {
        res.render('login', {
            message: "Needs authorization"
        })
    } else {
        let id = req.params.id
        await usersCollection.deleteOne({_id: new ObjectId(id)})
        res.redirect('/admin')
    }
})

app.post('/login', urlEncodedParser, async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    let user = await usersCollection.findOne({"username": username, "password" : password})
    console.log(user)
    if (!user) {
        console.log("NOT FOUND")
        res.render('login', {
            message: 'Invalid username or password'
        })
    } else {
        res.cookie('username', username)
        user.lastLoginTime = new Date()
        usersCollection.findOneAndReplace({_id: user._id}, user)

        req.session.username = username

        res.render('index', {
            message: 'Hello ' + user.name,
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
