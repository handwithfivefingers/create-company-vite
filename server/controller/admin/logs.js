const { errHandler, successHandler } = require('../../response');
const { Log } = require('../../model');
const fs = require('fs');
const path = require('path');

exports.getLogs = async (req, res) => {
  // console.log('coming here')
  try {
    let _logs = await Log.find({}).sort('-createdAt');

    let error = fs.readFileSync(path.join(global.__basedir, 'uploads', 'logs', 'error.log'), 'utf8');

    let out = fs.readFileSync(path.join(global.__basedir, 'uploads', 'logs', 'out.log'), 'utf8');

    let output = out
      .split('CC_LOGS :::')
      .reverse()
      .filter((item) => item !== '');
    // console.log(':::::::::::::::' , output)
    if (_logs) {
      return successHandler({ _logs, error, output }, res);
    } else {
      return errHandler(_logs, res);
    }
  } catch (err) {
    console.log('getLogs error');
    return errHandler(err, res);
  }
};
