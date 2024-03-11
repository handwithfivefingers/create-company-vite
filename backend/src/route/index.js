const express = require('express')
const AppRouter = express()
const v1Router = require('./v1')
const { router: adminRouter } = require('./admin')
const syncRequest = require('sync-request')
const fs = require('fs')
const path = require('path')
// Default User
AppRouter.post('/callback', async (req, res, next) => {
  try {
    //   console.log('coming callback', req)
    //   var updateFile = function (response, body, path) {
    //     if (body.status == 2) {
    //       var file = syncRequest('GET', body.url)
    //       fs.writeFileSync(path, file.getBody())
    //     }
    //     response.write('{"error":0}')
    //     response.end()
    //   }

    //   var readbody = function (request, response, path) {
    //     var content = ''
    //     request.on('data', function (data) {
    //       content += data
    //     })
    //     request.on('end', function () {
    //       var body = JSON.parse(content)
    //       updateFile(response, body, path)
    //     })
    //   }

    //   if (req.body.hasOwnProperty('status')) {
    //     updateFile(res, req.body, pathForSave)
    //   } else {
    //     readbody(req, res, pathForSave)
    //   }
    //   return res.sendStatus(200)

    //   const updateFile = function (response, body, path) {
    //     if (body.status == 2) {
    //       var file = syncRequest('GET', body.url)
    //       fs.writeFileSync(path, file.getBody())
    //     }
    //     response.write('{"error":0}')
    //     response.end()
    //   }
    //   const readbody = function (request, response, path) {
    //     var content = ''
    //     request.on('data', function (data) {
    //       content += data
    //     })
    //     request.on('end', function () {
    //       var body = JSON.parse(content)
    //       updateFile(response, body, path)
    //     })
    //   }
    // console.log('req.body', req.body)
    const pathForSave = path.join(global.__basedir, 'uploads', 'offices')
    // const fName = req.query.fileName
    if (req.body.hasOwnProperty('status')) {
      // updateFile(res, req.body, pathForSave)
      console.log('req on hasOwnProperty', req.body.status)

      if (req.body.status == 2) {
        const file = syncRequest('GET', body.url)
        console.log('file', file)
        fs.writeFileSync(pathForSave + '/doc.docx', file.getBody())
        return res.write('{"error":0}')
      }
    } else {
      console.log('coming 2')
      let content = ''
      req.on('data', (data) => {
        console.log('req on data', data)
        content += data
      })
      req.on('end', () => {
        console.log('req on end', data)

        let bodyData = JSON.parse(content)
        if (bodyData.status == 2) {
          const file = syncRequest('GET', body.url)
          fs.writeFileSync(pathForSave + '/doc.docx', file.getBody())
          return res.write('{"error":0}')
        }
      })
    }
    return res.write('{"error":0}')

    // const processTrack = async (response, bodyTrack, fNameTrack) => {

    // }
    // const readbody = async function readbody(request, response, fileName) {
    //   let content = ''
    //   request.on('data', async (data) => {
    //     // get data from the request
    //     content += data
    //   })
    //   request.on('end', async () => {
    //     const body = JSON.parse(content)
    //     await processTrack(response, body, fileName) // and track file changes
    //   })
    // }
    // const prepareForSave = async (status) => {
    //   if (status === 2 || status === 3) {
    //     await processSave()
    //   } else if (status === 6 || status === 7) {
    //     await processForceSave()
    //   }
    // }

    // if (req.body.hasOwnProperty('status')) { // if the request body has status parameter
    //     await processTrack(res, req.body, fName); // track file changes
    //   } else {
    //     await readbody(req, res, fName); // otherwise, read request body first
    //   }
  } catch (error) {
    console.log('error', error)
    return res.write('{"error":1}')
  }
})
AppRouter.use('/v1', v1Router)

// Admin

AppRouter.use('/v1/admin', adminRouter)

module.exports = AppRouter
