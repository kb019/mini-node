const fs = require('fs');

fs.readFile('./tokens.json', function(err, data) { 

    if (err) throw err; 

    const tokens = JSON.parse(data); 
    console.log(tokens[0].token); 
})


