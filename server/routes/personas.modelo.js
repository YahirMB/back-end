const express = require("express");

const app = express();

app.get("/", async (req,res) => {
    return res.status(200).json({
        ok:true,
        status:200,
        text:"hola mundo",
    });


});

app.post("/", async (req,res) => {
    try{
let body = req.body;
console.log(body);
        if(body){
    return res.status(200).json({
        ok:true,
        status:200,
        body,
        
    });
}
}catch (error){
    return res.status(500).json({
        ok:true,
        status:200,
        body,
        
    });

}


});


module.exports = app;