const express = require('express');
const router = express.Router();

const mail = "admin@gmail.com"
const pass = '1111'
const movies = 
[
    {
        name:"Ant-man And The Wast Quantumania",
        description:"2023",
        src:"https://cdn.marvel.com/content/1x/antmanandthewaspquantumania_lob_crd_03.jpg"
    },
    {
        name:"Thor : Love and Thunder  First part",
        description:"2022",
        src:"https://cdn.marvel.com/content/1x/thorloveandthunder_lob_crd_04.jpg"
    },
    {
        name:"Doctor Strange in the Multiverse of Madness",
        description:"2022",
        src:"https://cdn.marvel.com/content/1x/doctorstrangeinthemultiverseofmadness_lob_crd_02_3.jpg"
    },
    {
        name:"The Marvel Womens:First part",
        description: "NOV 10 2023",
        src:"https://cdn.marvel.com/content/1x/themarvels_lob_crd_05.jpg"
    },
    {
        name:"Guardians of the Galaxy Vol.3",
        description:"2023",
        src:"https://cdn.marvel.com/content/1x/guardiansofthegalaxyvolume3_lob_crd_03.jpg"
    },
    {
        name:"Black Panter : Wakands Forever",
        description:"2022",
        src:"https://cdn.marvel.com/content/1x/blackpantherwakandaforever_lob_crd_06.jpg"
    },
];


router.get('/', (req, res) => {
    if (req.cookies.user) {
        res.redirect('/home',302)
    }else{
        res.render('base', { title: 'Movieshub login' });
    }
})


router.post('/login',(req,res)=>{
    if (req.body.email== mail && req.body.password==pass) {
        req.session.user = req.body.email
        res.cookie('user', req.session.user)
        
        res.redirect('/home',302,{title:'Movies Hub'})
        
        
    }else{
        res.redirect('/signin',302)
    }
})

router.get("/home",(req,res)=>{
    if(req.cookies.user)
    {
        res.render('home', {title:"Movies Hub ",movies})
    }
    else
    {
        res.redirect('/')
    }
})

router.get("/logout",(req,res)=>{
    if(req.cookies.user){
        res.clearCookie('user')
        req.session.destroy((err)=>{
            if(err){
                res.send(err)
            }else{
                res.render('base',{title:"MoviesHub Login",logout:"Logout Seccusfully"}
                )
           }
        })
    }else{
        res.redirect("/Iogounjt")
    }
})

router.get("/signin",(req,res)=>{
    res.render("sign")
})
router.get("/about", (req, res) => {
    if (req.cookies.user) {
      let num = req.query.num;
        
      if (!isNaN(num) && num >= 0) {
        res.render('about', { movies, num });
      } else {
        res.status(400).send("<title>Invalid parameter</title><h1>Invalid id parameter</h1><p>give the numbers of movies as quary params  <h3>http://localhost:8080/about?num=__</h3></p> <small>the num should be lessthan 7</small>");
      }
    } else {
      res.status(403).send("Unauthorized");
    }
  });

module.exports = router