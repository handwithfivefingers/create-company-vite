const express  = require('express');
const helmet = require('helmet');
const PuppeteerRouter = require('./route')
const app = express();
const PORT = 3002

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded())
app.use('/api', (req,res,next)=> {
  console.log('Request income', req)
  next()
}, PuppeteerRouter)

app.use((err, req, res, next) => {
  if (err && err.code === 'ECONNABORTED') {
    console.log('ERROR CONNECTION')
    res.status(400).end(); // Don't process this error any further to avoid its logging
  } else
    next(err);
});

app.listen(PORT, () => {
  console.log('Puppeteer Service start on port', PORT)
})