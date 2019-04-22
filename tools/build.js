const webpack = require('webpack');
const config = require('../webpack.config.prod');
const {chalkError,chalkProcessing,chalkSuccess,chalkWarning,chalkMessage} =  require('./chalkConfig');
process.env.NODE_ENV = 'production';
console.log(chalkProcessing('正在打包中，请骚后，这需要点时间'));
webpack(config).run((err,stats)=>{
  if(err){
    console.log(chalkError(err));
    return 1;
  }
  const jsonStats = stats.toJson();
  if(jsonStats.hasErrors){
    return jsonStats.error.map(error=>console.log(chalkError(error)));
  }
  if(jsonStats.hasWarnings){
    console.log(chalkWarning('webpack 编译警告'));
    jsonStats.warnings.map(warning=>console.log(chalkWarning(warning)));
  }
  console.log(chalkMessage(`webpack 状态:${stats}`));
  console.log(chalkSuccess('打包成功:您打包的文件放在根目录的dist 目录下面'));
  return 0;
});