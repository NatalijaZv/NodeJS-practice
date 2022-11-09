const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try{
    const data = await fsPromises.readFile(path.join(__dirname,"files","starter.txt"),"utf8")
    console.log(data)
    await fsPromises.unlink(path.join(__dirname,"files","starter.txt"))
    await fsPromises.writeFile(path.join(__dirname,"files","promiseWrite.txt"),data)
    await fsPromises.appendFile(path.join(__dirname,"files","promiseWrite.txt"),"\n\n Nice to meet you")
    await fsPromises.rename(path.join(__dirname,"files", "promiseWrite.txt"),path.join(__dirname,"files","newPromiseWrite.txt"))
    const newData = await fsPromises.readFile(path.join(__dirname,"files","newPromiseWrite.txt"),"utf8")
    console.log(newData)
  }
  catch(err){
    console.error(err)
  }
}
fileOps()

// fs.readFile(path.join(__dirname, "starter.txt"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log("data", data);
// });
// fs.writeFile(
//   path.join(__dirname, "reply.txt"),
//   "HELLO I AM WRITEFILE",
//   (err) => {
//     if (err) throw err;
//     console.log("WRITING complete");
//     fs.appendFile(
//       path.join(__dirname, "reply.txt"),
//       "\n\n YES IT IS",
//       (err) => {
//         if (err) throw err;
//         console.log("APPEND complete");
//         fs.rename(
//           path.join(__dirname, "reply.txt"),
//           path.join(__dirname, "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename complete");
//           }
//         );
//       }
//     );
//   }
// );

// process.on("uncaughtException", (err, origin) => {
//   fs.writeSync(
//     process.stderr.fd,
//     `Caught exception: ${err}\n` + `Exception origin: ${origin}`
//   );
// });

// process.on("uncaughtException", (err) => {
//   console.error(`There is an uncaught error: ${err}`);
//   process.exit(1);
// });
// console.log("Hello...  ");
// console.log("BLA BLA");
