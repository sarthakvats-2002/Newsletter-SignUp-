const express= require("express");
const bodyParser= require("body-parser");
const request=require("request");
const https= require("https");

const app= express();

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.use(bodyParser.urlencoded({
  extended:true
}));
app.post("/", function(req, res){
const firstName=req.body.fName;
const lastName= req.body.lName;
const email= req.body.email;

const data={
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_feilds:{
        FNAME: firstName,
        LNAME: lastName
      }

    }
  ]
};

const jsonData= JSON.stringify(data);
const url= "116e518e1738d175384a41e97c854083-us13";

const options={
  method: "POST",
  auth: "sarthak1:718afd0416b6f4fe76f21cfb779d366f-us13"
}

const request= https.request(url, options, function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
      res.sendFile(__dirname + "/failure.html");
  }
response.on("data", function(data){
  console.log(JSON.parse(data));
})
})
//
request.write(jsonData);
request.end();

// console.log(firstName, lastName, email);
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

// 2cf9fa4737
