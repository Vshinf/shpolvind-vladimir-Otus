const fs = require('fs');
const path = require('path');

const start = function () {
    const args = process.argv.slice(2);
    console.log("Start", args);

    if( args[0] ){
        getTree(args[0]).then(console.log);
    }else{
        console.log("Plz enter parametr path");
    }
}

const getTree = async function (nowPath){
    let dirs = [];
    let files = [];

    if (await isDirectory(nowPath)) {
        dirs.push(nowPath);
        await readdir(nowPath)
            .then(async filenames => {
                await Promise.all(filenames.map(file => getTree( path.join(nowPath, file) )))
                    .then(contents => {
                        for (let item of contents) {
                            if (item.dirs.length){
                                dirs = dirs.concat(item.dirs);
                            }
                            if (item.files.length){
                                files = files.concat(item.files);
                            }
                        }
                    })
            });
    } else {
        files.push(nowPath);
    }

    return {
        files,
        dirs
    };
}

const isDirectory = function (filepath) {
    return new Promise((resolve, reject) => {
        fs.lstat(filepath, (e, stat) => {
            e ? reject(e) : resolve(stat.isDirectory());
        })
    });
}

const readdir = function (filepath) {
    return new Promise((resolve, reject) => fs.readdir(filepath, (err, files) => {
        err ? reject(err) : resolve(files);
    }))
}

start();