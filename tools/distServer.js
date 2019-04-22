// const express = require('express');
// const path = require('path');
// const open = require('open');
// const port = 3000;
// const app = express();
// // app.set("dist", path.resolve(__dirname,"../dist"));
// // app.use(express.static('dist',path.resolve(__dirname,"../dist")));
// // app.use(express.static(path.join(__dirname, '../','dist')));
// app.use(express.static(path.join(__dirname, '../','dist')));
// // app.set('views', 'dist');
// // app.engine('html',require('ejs').renderFile);
// // app.set('view engine', 'html');
// app.get('*',(req,res)=>{
//   res.render('index', {req, res});
// });
// app.listen(port, function(err) {
//   /*eslint-disable no-console*/
//   if (err) {
//     console.log(err);
//   } else {
//     open(`http://localhost:${port}`);
//   }
// });
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const {chalkProcessing} = require('./chalkConfig');

/* eslint-disable no-console */

console.log(chalkProcessing('打开项目中'));

// Run Browsersync
browserSync({
  port: 4000,
  ui: {
    port: 4001
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
});