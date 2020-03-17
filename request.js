const http = require('http');
var num = 10;
var typeAsync = true;

var req = (num) => {
    return new Promise(function(resolve, reject) {
        http.get('http://127.0.0.1:3000/?num=' + num, (res) => {
            var rawData  = '';
            res.on('data', (chunk) => {
                rawData  += chunk;
            });

            res.on('end', () => {
                console.log(rawData);
                resolve();
            });
        }).on("error", (e) => {
            console.log("Error: " + e.message);
            reject();
        });
    });
}

if( typeAsync ){
    for (i = 1; i <= num; i++) {
        req(i);
    }
}else{
    (async() => {
        for (k = 1; k <= num; k++) {
            await req(k);
        }
    })();
}