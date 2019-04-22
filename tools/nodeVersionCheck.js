var exec = require('child_process').exec;
exec('node -v',function(err,stdout){
    if(err) throw err;
    if(parseFloat(stdout.slice(1) < 8)){
        throw new Error('node.js 版本必须大于 8以上');
    }
});