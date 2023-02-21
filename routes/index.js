var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();
const passport = require("passport");
const passportLocal = require("passport-local")
const userModel = require("./users")
const postModel = require("./post")
const multer = require("multer")

//passport authentication
passport.use(new passportLocal(userModel.authenticate()));



// multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/upload')
  },
  filename: function (req, file, cb) {
    const uniq = Date.now() + Math.floor(Math.random()*1000) + file.originalname
    cb(null, uniq)
  }
})

const upload = multer({ storage: storage })



//Index
router.get('/', function(req, res, next) {
  res.render('index');
});
  

router.get('/registerpage',function(req,res){
  res.render('registerpage')
});

// loginpage
router.get("/loginpage",isLoggedIn,function(req,res){
  res.render('loginpage');
})

// register
router.post("/register",function(req,res){
  var newUser = new userModel({
    username:req.body.username,
    name:req.body.name
  });
  userModel.register(newUser,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/loginpage")
    });
  });
});

//login
router.post("/login",passport.authenticate("local",{
  successRedirect:"/loginpage",
  failureRedirect:"/"
}),function(req,res){
 
});

//logout
router.get("/logout",function(req,res){
  req.logOut(function(err){
    if(err) throw err;
    res.redirect('/');
  });
});


//Is logged IN
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

//profile
router.get("/profile",isLoggedIn,function(req,res){
  userModel.findOne({username:req.session.passport.user})
  .populate("posts")
  .then(function(data){
    res.render('profile',{data})
  })
})


// upload
router.post("/upload",isLoggedIn,upload.single('images'),function(req,res){
  userModel.findOne({
    username:req.session.passport.user
  }).then(function(foundeduser){
    console.log(foundeduser.File)
    foundeduser.File = req.file.filename
    foundeduser.save()
    .then(function(saved){
      res.redirect('/profile')
    })
  })
})


//post
router.post("/post",isLoggedIn,function(req,res){
  userModel.findOne({username:req.session.passport.user}).then(function(loggedinuser){
    postModel.create({
      post:req.body.newpost,
      userid:loggedinuser._id
    }).then(function(createdpost){
      loggedinuser.posts.push(createdpost._id);
      loggedinuser.save()
      .then(function(saveduser){
        res.redirect("/profile");
      })
      })
    })
  })



  //likes
router.get("/likes/:id",isLoggedIn,function(req,res){
  userModel.findOne({
    username:req.session.passport.user
  }).then(function(foundeduser){
    postModel.findOne({
      _id:req.params.id
    }).then(function(foundedpost){
     if(foundedpost.likes.indexOf(foundeduser._id)=== -1){
       foundedpost.likes.push(foundeduser._id)
     }
     else{
       var kahape =foundedpost.likes.indexOf(foundeduser._id)
       foundedpost.likes.splice(kahape,1)
     }
     foundedpost.save()
     .then(function(saveddata){
       res.redirect(req.headers.referer)
     })
    })
  })
  
})



//comment

router.post("/comment/:postid" ,isLoggedIn,function(req,res){
  userModel.findOne({
    username:req.session.passport.user
  }).then(function(foundeduser){
    postModel.findOne({
      _id:req.params.postid
    }).then(function(foundedpost){
      foundedpost.comments.push({name:foundeduser.username},{comment:req.body.comment})
      foundedpost.save()
      .then(function(savedcomment){
        res.redirect(req.headers.referer);
      })
    })
  })
})



router.get("/allpost",isLoggedIn,function(req,res){
  userModel.findOne({
    username:req.session.passport.user
  }).then(function(data){
    postModel.find()
    .then(function(foundpost){
     res.render('allpost',{foundpost,data})
    })   
  })
 
})

router.get("/qqq",function(req,res){
  postModel.find().then(function(allpost){
    res.send(allpost);
  })
})

router.get("/aaa",function(req,res){
  userModel.find().then(function(allpost){
    res.send(allpost);
  })
})


router.get("/chat",isLoggedIn,async function(req,res){
  const loggedInUser = await userModel.findOne({username:req.session.passport.user})
  res.render('chat', {loggedInUser})
})

router.get('/backtologinpage',isLoggedIn,function(req,res){
res.render('loginpage')
})






module.exports = router;