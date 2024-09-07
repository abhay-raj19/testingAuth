const express = require('express');

const app = express();

app.use(express.json())

const users = [ ];

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/signup",function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"you have signed up, recently"
    })
})

app.post("/signin" , function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    //check the user exist in the local storage
    const user = users.find(function(u){
        if (u.username == username && u.password == password){
            return true;
        } else {
            return false;
        }
    });

    if(user){
        const token = generateToken();
        user.token = token;

        res.json({
            message: "The token of this user is" + token
        })
    } else {
        res.status(403).json({
            message:'Invalid username and password'
        })
    }



})


app.get("/",function(req,res){
    res.json({
        "msg":"server up an up"
    })
})

app.listen(3000, function(){
    console.log("server started at 3000");
})