const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'))
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


const routes = require('./routes/all-routes');

app.use(routes);

// live reload
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//  End live reload



mongoose.connect('mongodb+srv://omarbakr181993:DsEjRFJFKs1hA9Yj@cluster0.ndzrc.mongodb.net/all-user?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
 })
 .catch((err) => {
   console.log(err);
 });
