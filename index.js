const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'))
const user = require('./models/modelSchema');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
var moment = require('moment'); 


// live reload
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
const User = require('./models/modelSchema');
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//  End live reload

//  Get Request
app.get('/', (req, res) => {
    User.find().then((users) => {
        res.render('index', { data: users, currentPage: 'index', moment: moment });
    }).catch((err) => {
        console.log(err);
    })
})

app.get('/user/add.html',(req, res) => {
  res.render('user/add',{currentPage: 'add'})
})


app.get('/user/view.html',(req, res) => {
  res.render('user/view',{currentPage: 'view'})
})

app.get('/user/search.html',(req, res) => {
  res.render('user/search',)
})


app.get('/view/:id',(req, res) => {
  User.findById(req.params.id).then((result) => {
    res.render('user/view',{currentPage: 'index', data: result, moment: moment});
  }).catch((err) => {
    console.log(err);
  })
})

app.get('/edit/:id',(req, res) => {
  User.findById(req.params.id).then((result) => {
    res.render('user/edit',{currentPage: 'edit', data: result , moment: moment});
  }).catch((err) => {
    console.log(err);
  })
})


//  Post Request
app.post('/user/add.html', (req, res) => {
  User.create(req.body).then((result) => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log(err);
  });
})


//  Update Request
app.put('/edit/:id', (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
  .then((result) => {
    res.redirect("/");
  });
});


//  Delete Request
app.delete("/edit/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
  res.redirect("/");
  });
});



mongoose.connect('mongodb+srv://omarbakr181993:DsEjRFJFKs1hA9Yj@cluster0.ndzrc.mongodb.net/all-user?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
 })
 .catch((err) => {
   console.log(err);
 });
