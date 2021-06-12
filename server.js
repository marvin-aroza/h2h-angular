// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//       return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }
// const express = require('express');
// const app = express();
// app.use(requireHTTPS);

// const port = process.env.PORT || 3000;

// app.use(express.static('./dist/helping-hand-admin'));

// app.get('/*', function(req, res) {
//   console.log("inside");
//   res.sendFile('index.html', {root: 'dist/helping-hand-admin/'}
// );
// });

// // app.listen(process.env.PORT || 8080);
// app.listen(port,()=>{
//   console.log('Port running at '+port);
// })

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/dist/helping-hand-admin'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/helping-hand-admin/index.html'));
});


// app.listen(process.env.PORT || 8000);
app.listen(port,()=>{
  console.log('Port running at 8000');
})
