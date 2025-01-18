const User = require('../models/modelSchema');
var moment = require('moment'); 




// GET REQUEST
const user_index_get = (req, res) => {
  User.find().then((users) => {
      res.render('index', { data: users, currentPage: 'index', moment: moment });
  }).catch((err) => {
      console.log(err);
  })
}

const user_add_get = (req, res) => {
  res.render('user/add',{currentPage: 'add'})
  }

const user_view_get = (req, res) => {
  res.render('user/view',{currentPage: 'view'})
  }

const user_search_get = (req, res) => {
  res.render('user/search',)
  }

const user_view_one_get = (req, res) => {
  User.findById(req.params.id).then((result) => {
    res.render('user/view',{currentPage: 'index', data: result, moment: moment});
  }).catch((err) => {
    console.log(err);
  })
  }

const user_edit_get = (req, res) => {
  User.findById(req.params.id).then((result) => {
    res.render('user/edit',{currentPage: 'edit', data: result , moment: moment});
  }).catch((err) => {
    console.log(err);
  })
  }

const user_search_one_get = (req, res) => {
  User.find().then((users) => {
    res.render('user/search',{currentPage: 'search', data: users, moment: moment});
  }).catch((err) => {
    console.log(err);
  })
  }

//  Post Request

const user_add_post = (req, res) => {
  User.create(req.body).then((result) => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log(err);
  });
  }

const user_search_post = (req, res) => {
  const search = req.body.search.trim();
  User.find({ $or: [{firstName: search}, {lastName: search}] })
  .then((result) => {
    res.render('user/search',{currentPage: 'search', data: result , moment: moment});
  })
  .catch((err) => {
    console.log(err)
  })
  }

// Update Request 

const user_update = (req, res) => {
User.updateOne({ _id: req.params.id }, req.body)
.then((result) => {
  res.redirect("/");
});
}

// Delete Request

const user_delete = (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
  res.redirect("/");
  });
  }

module.exports = {user_index_get, user_add_get, user_view_get, user_search_get, user_view_one_get, user_edit_get, user_search_one_get, user_add_post, user_search_post, user_update, user_delete}