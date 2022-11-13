const functions = require("firebase-functions");
const express = require("express");
const admin= require('firebase-admin');
const app = express();
var serviceAccount = require("./service.json");
const db = require('./db.js')
const contract = require('./contract.js')
const url = require('url');
var cors = require('cors')
app.use(cors());


 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://trustpay-f2ee3-default-rtdb.firebaseio.com"
  });


 function parseRequest(string){

    var wcs = string.split("?")[1];
    var groups = wcs.split("&");
    var retObj = {};
    groups.forEach(group=>{
        retObj[group.split("=")[0]] = group.split("=")[1]
    })

    return retObj;
}

app.get("/test", (req,res)=>{
    res.send("test")
})

app.get("/createUser", async(req,res)=>{
    let {email, name, uid, privateKey, address,mnemonic} = parseRequest(req.url)
   
    email = decodeURIComponent(email);
    await db.createUserFirebase(admin, name, email, uid,privateKey, address, mnemonic)
    res.send({
        success:true
    })

})


app.get("/getuser", async(req,res)=>{
    let {email, name, uid} = parseRequest(req.url)
})

app.get("/borrowSet", async(req,res)=>{
    let {uid, amount} = parseRequest(req.url);

    const currentLiq =await contract.getLiqPoolBal();

    console.log("currentLiq",currentLiq);

    if(parseFloat(currentLiq)>parseFloat(amount)){
        await admin.firestore().collection('users').doc(uid).update({
            borrowed:admin.firestore.FieldValue.increment(parseFloat(amount))
        })
        res.send("success");

    } else {
        res.send("failure");

    }
    
  
    //transfer usdc out of contract to wallet 



})


app.get("/liquidate", async(req,res)=>{
    let {uid, amount} = parseRequest(req.url)
    await admin.firestore().collection('users').doc(uid).update({
        failure:admin.firestore.FieldValue.arrayUnion(amount), 
    })
    await admin.firestore().collection('users').doc(uid).update({
        borrowed:admin.firestore.FieldValue.increment(-1*amount)
    })

    await contract.liquidateEth("0x7e1EAa2d8e0ceBD8AaADa559E0EE214575B94918");
    res.send("success")
})




app.get("/cs", async(req,res)=>{
    let {uid, cs} = parseRequest(req.url)
    await admin.firestore().collection('users').doc(uid).update({
        cs:cs
    })
    res.send("success")
})

app.get("/creditValues", async(req,res)=>{
    let {uid} = parseRequest(req.url)
    const userdoc= await admin.firestore().collection('users').doc(uid).get();
    res.send({
        success:userdoc.data().success||[], 
        failure:userdoc.data().failure||[], 
        cs:userdoc.data().cs||0, 
        borrowed:userdoc.data().borrowed||0
    })
})


app.get("/currentCollateral",async (req,res)=>{
    let {uid} = parseRequest(req.url);
    const userdoc= await admin.firestore().collection('users').doc(uid).get();
    const balance = await contract.getEthBalance(userdoc.data().address);
    res.send(balance);
})

app.get("/getCurrentLiquidity", async(req,res)=>{
    const currentLiq =await contract.getLiqPoolBal();
    res.send(currentLiq)
})

app.get("/transferERC", async(req,res)=>{
    let {uid, amount} = parseRequest(req.url);
    const userdoc= await admin.firestore().collection('users').doc(uid).get();
   const result = await contract.payErc20(
        userdoc.data().mnemonic, 
        userdoc.data().address, 
        parseInt(amount)
    )
    res.send(result)
})

app.get("/borrowInfo", async(req,res)=>{
    let {uid} = parseRequest(req.url);
    
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    console.log(userDoc.data())

    res.send(userDoc.data().borrowed.toString());

})

app.get("/increaseBorrowed", async(req,res)=>{
    let {uid, amount} = parseRequest(req.url);

    await admin.firestore().collection('users').doc(uid).set({
        borrowed:admin.firestore.FieldValue.increment(parseFloat(amount))
    }, {merge:true})
    res.send("success")
})

app.get("/payback", async(req,res)=>{

    let {uid} = parseRequest(req.url);
    console.log(uid)
    
    
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    await admin.firestore().collection('users').doc(uid).update({
        borrowed:0
    })
    await admin.firestore().collection('users').doc(uid).update({
        success:admin.firestore.FieldValue.arrayUnion(userDoc.data().borrowed)
    })

    await contract.liquidateEth(userDoc.data().address);

    res.send("success")

})

exports.app = functions.https.onRequest(app);
