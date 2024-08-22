const express = require('express');
const app = express();
const path = require ('path');
const UserDb = require('./models/user');
const RoleDb =require('./models/role');
const jwt=require('jsonwebtoken');

UserDb();
RoleDb();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/',async(req,res)=>{
  res.render('login');
})

app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

     
      const user = await RoleDb.findOne({ email ,password });
      if (!user) {
          return res.status(400).send('Invalid email or password');
      }

     
        if (password !== user.password) {
         return res.status(400).send('Invalid email or password');
        }
        let token = jwt.sign({ email: user.email }, "shhhhhhhhhhh");
         res.cookie("token", token);

      console.log('User logged in:', user);

      res.redirect('/createUser');
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.get('/createUser', async (req, res) => {
    const users = await UserDb.find();

    res.render('createUser', { users: users });

    // res.render('createUser');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
    let createdUser = await UserDb.create({
      name,
      email,
      image,
    });
    
    res.redirect('/');
    console.log("user has been created");

  });

  app.get('/users',async (req,res)=>{
    const users = await UserDb.find();
    res.render('showUsers', { users: users });
  });

   app.get('/edit/:userId',async(req,res)=>{

        const Id=req.params.userId;
        const selectedObj=await UserDb.findById(Id);
        res.render('update',{user:selectedObj});
            
   })
   app.post('/update/:userId',async (req,res)=>{
             const {name,email,imageUrl} = req.body;
             const userId = req.params.userId;

          const updatedUser = await UserDb.findByIdAndUpdate(
              userId,
              { name, email, imageUrl },
              { new: true, runValidators: true }
          )
      
          res.redirect('/');
         });

    app.get('/delete/:userId',async(req,res)=>{
      const userId=req.params.userId;
      const deletedUser = await UserDb.findByIdAndDelete(userId);
     
     res.redirect('/');

    })     
  
