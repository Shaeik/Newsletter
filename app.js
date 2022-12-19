const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})
app.post("/failure",(req,res)=>{
    res.redirect("/")
})
app.post("/",(req,res)=>{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    

    var data={
        members :[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAMe:firstName,
                    LNAME:lastName
                }


            }
        ]
    };
    const  jsonData = JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/bd161be6fd"
    const options={
        method:"POST",
        auth:"shaeik:a693fb9dd54f48a41c35b272232e1db7-us21"
    }    
  const request=  https.request(url,options,(response)=>{
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html")
    }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Started")
})

// f6d79b44cd60f8473e775e4a80643800-us21
// bd161be6fd