const mongoose =require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/usersapp");
mongoose.connect('mongodb://127.0.0.1:27017/schools')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

const schoolSchema= new mongoose.Schema({
    class: String,
    school_name: String,
    student: String,
});
// module.exports = mongoose.model("users", userSchema);
const School = mongoose.model('School', schoolSchema);

module.exports = School;