//INSTALL PACKAGE (NODEMON) GLOBALY
//nodemon -> monitors files
// 1. install npm nodemon: npm i nodemon -g
// 2. write nodemon in terminal
// -> it "refresh" terminal, when file is saved (you dont need to write: npr: node index)
// to exit from nodemon: ctrl+c

// V package.json v terminalu vpišemo: npm i nodemon -D  -> tako installamo nodemon as dev dependencies

console.log("testingNEW!")

//INSTALL PACKAGE FOR OUT PROJECT
//initialize npm for our project: npm init 

const {format} = require("date-fns")
const {v4:uuid} = require("uuid")   //in this case we need to import version v4 as uuid

console.log(format(new Date(),"yyyyMMdd\tHH:mm:ss"))

console.log(uuid())
console.log(uuid())

//dependencies version: "^2.29.3" (major version,minor version, patch)
//"^2.29.3" ^ means go ahead and update the minor version but not the major version
// "~2.29.3" ~ means go ahead and update a patch version, nut not the minor vesion
// "*"  * means go and update everything all the time


//if we want to install a specific version we need to use @and wanted version:  npm i uuid@8.3.1.
// if we use only npm i uuid we will get the latest version

// npm update -> npm will check for any updates for our dependecies
//npm unistall or npm rm  to uninstall or remove dependecies
// if we want to unistall dev dependency we need to use -D : npm rm nodemon -D