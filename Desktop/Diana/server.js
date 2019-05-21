
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var Xotaker = require("./modules/Xotaker.js");
let random = require('./modules/random');
// let Amenates= require('./modules/Amenates');
// let Dimon= require('./modules/Dimon');
// let Gishatich= require('./modules/Gishatich');
// let Living = require('./modules/LivingCreature.js');
// let Xndzor = require('./modules/Xndzor');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
matrix = [];
grassHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater, waterArr, fireArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < waterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fireArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 1, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new Xotaker(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)























// weather = "winter"
// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// var fs = require('fs');
// app.use(express.static("."));
// app.get('/', function (req, res) {
//   res.redirect('index.html');
// });
// server.listen(3000);
// var cl = false
// io.on("connection", function (socket) {
//   if (cl) {
//     setInterval(drawserverayin, 200);
//     cl = true;
//   }
// });
// matrix = fillMatrix(100, 100)
// function fillMatrix(n, m) {
//   var matrix = []
//   for (var i = 0; i < n; i++) {
//     matrix.push([])
//     for (var a = 0; a < m; a++) {

//       matrix[i].push(0)
//     }
//   }
//   return matrix
// }
// var Grass = require("./Grass.js");
// var Xotaker = require("./Xotaker.js");
// var Gishatich = require("./Gishatich.js");
// var Dimon = require("./Dimon.js");
// var Xndzor = require("./Xndzor.js");

// for (var a = 0; a < 1000; a++) {
//   var x = Math.floor(Math.random() * 100)
//   var y = Math.floor(Math.random() * 100)
//   matrix[y][x] = 1
// }
// for (var b = 0; b < 100; b++) {
//   var x = Math.floor(Math.random() * 100)
//   var y = Math.floor(Math.random() * 100)
//   matrix[y][x] = 2
// }
// for (var c = 0; c < 200; c++) {
//   var x = Math.floor(Math.random() * 100)
//   var y = Math.floor(Math.random() * 100)
//   matrix[y][x] = 3
// }
// for (var d = 0; d < 60; d++) {
//   var x = Math.floor(Math.random() * 100)
//   var y = Math.floor(Math.random() * 100)
//   matrix[y][x] = 4
// }
// for (var e = 0; e < 120; e++) {
//   var x = Math.floor(Math.random() * 100)
//   var y = Math.floor(Math.random() * 100)
//   matrix[y][x] = 5
// }
// grassArr = [];
// xotakerArr = [];
// GishatichArr = [];
// DimonArr = [];
// XndzorArr = [];
// GrassStatics = 0;
// Xotakerstatics = 0;
// GishatichStatics = 0;
// DimonStatics = 0;
// XndzorStatics = 0;
// for (var y = 0; y < matrix.length; y++) {
//   for (var x = 0; x < matrix[y].length; x++) {
//     if (matrix[y][x] == 1) {
//       var gr = new Grass(x, y, 1)
//       grassArr.push(gr)
//       GrassStatics++
//     }
//     else if (matrix[y][x] == 2) {
//       var kt = new Xotaker(x, y);
//       xotakerArr.push(kt)
//       Xotakerstatics++
//     }
//     else if (matrix[y][x] == 3) {
//       var xr = new Gishatich(x, y);
//       GishatichArr.push(xr)
//       GishatichStatics++
//     }
//     else if (matrix[y][x] == 4) {
//       var am = new Dimon(x, y);
//       DimonArr.push(am)
//       DimonStatics++
//     }
//     else if (matrix[y][x] == 5) {
//       var ar = new Xndzor(x, y);
//       XndzorArr.push(ar)
//       XndzorStatics++
//     }
//   }
// }
// function drawserverayin() {
//   for (var i in grassArr) {
//     if (weather != "winter") {
//       grassArr[i].mult();
//     }
//   }
//   for (var i in xotakerArr) {
//     xotakerArr[i].eat();
//     xotakerArr[i].move();
//     if (weather != "spring") {
//       xotakerArr[i].mult();
//     }
//     xotakerArr[i].die();
//   }
//   for (var i in GishatichArr) {
//     GishatichArr[i].eat();
//     GishatichArr[i].move();
//     if (weather != "autumn") {
//       GishatichArr[i].mult();
//     }
//     GishatichArr[i].die();
//   }
//   for (var i in DimonArr) {
//     DimonArr[i].eat();
//     DimonArr[i].move();
//     if (weather != "autumn" || weather != "winter") {
//       DimonArr[i].mult();
//     }
//     DimonArr[i].die();
//   }
//   for (var i in XndzorArr) {
//     XndzorArr[i].eat();
//     XndzorArr[i].eat2();
//     XndzorArr[i].move();
//     XndzorArr[i].mult();
//     XndzorArr[i].die();
//   }
//   io.sockets.emit("matrix", matrix)
// }
// setInterval(drawserverayin, 1000)
// io.on("connection", function (socket) {
// });

// function changeweather() {
//   if (weather == "winter") {
//     weather = "spring"
//   }
//   else if (weather == "spring") {
//     weather = "summer"
//   }
//   else if (weather == "summer") {
//     weather = "autumn"
//   }
//   else if (weather == "autumn") {
//     weather = "winter"
//   }
//   io.sockets.emit("weather", weather)
// }
// setInterval(changeweather, 3000)
// var statistics = {"stat":[]};
// setInterval(function(){
//   statistics.stat.push({
//     "GrassStatics": GrassStatics,
//     "Xotakerstatics": Xotakerstatics,
//     "GishatichStatics": GishatichStatics,
//     "DimonStatics": DimonStatics,
//     "XndzorStatics": XndzorStatics,
//   });
//   fs.writeFile("statistics.json", JSON.stringify(statistics), function(err){
//     if(err) throw (err)

//   })
// }, 3000 )