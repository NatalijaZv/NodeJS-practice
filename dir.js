const fs = require("fs")
//if file name does exist do not use same name (dont over write it)
// if directory does not exist - create it
if(!fs.existsSync("./new")){
    
//make directory
    fs.mkdir("./new", (err) => {
        if (err){
            throw err
        }
        console.log("Directory created")
    })
}

//delete new directory   rmdir - remove directory
if(fs.existsSync("./new")){
    fs.rmdir("./new", (err)=>{
        if(err) {
            throw err
        }
        console.log("directory removed")
    })
}

