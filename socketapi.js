const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var id= [];
var userarr=[]
var User ='';



io.on( "connection", function( socket ) {
   
    id.push(socket.id) 

//usernhi aaraha
    socket.on("username",function(user){
        console.log(user);
        User = user;
        console.log(User)
        userarr.push(User)
        console.log(userarr)
        io.emit('onlineusername',userarr)
        io.emit("onlineuser", {length: id.length})

    })
    
   
    socket.on("msg",function(textmessage){
        io.emit("reply",{userid:socket.id,textmessage :textmessage, username:User})
    })
    

    socket.on("disconnect",function(){
        id.splice(id.indexOf(socket.id),1)
        userarr.splice(userarr.indexOf(User),1)

    })

    socket.on("typing",function(value){
        socket.broadcast.emit("usertyping", value)
    })



});


module.exports = socketapi;