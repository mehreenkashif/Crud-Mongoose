const mongoose =require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/usersapp2')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

const userSchema= new mongoose.Schema({
    email: String,
    name: String,
    image: String,
});
// module.exports = mongoose.model("users", userSchema);
const User = mongoose.model('User', userSchema);

module.exports = User;
