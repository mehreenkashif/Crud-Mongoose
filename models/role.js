const mongoose =require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/roles')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

const roleSchema= new mongoose.Schema({
    email: String,
    username: String,
    password: String
    
});
// module.exports = mongoose.model("users", userSchema);
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;