const fs = require("fs")
const path = require("path");
const rs = fs.createReadStream(path.join(__dirname,"files","lorem.txt"),{encoding: "utf8"})

const ws = fs.createWriteStream(path.join(__dirname,"files","newLorem.txt"))

//rs READABLE STREAM
//ws WRITING STREAM

// rs.on("data", (dataChunk)=>{
//     ws.write(dataChunk)
//     console.log(dataChunk)
// })

//better way
rs.pipe(ws)