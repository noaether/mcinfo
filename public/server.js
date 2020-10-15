const express = require(`express`);
const keepAliveApp = express();
const path = require(`path`);
const emoji = require(`emoji-log`);
const timer = require(`@calipsa/timer`);

keepAliveApp.get(`/`, function (req, res) {
  var options = {
    root: path.join(__dirname),
    dotfiles: `deny`,
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };
  var fileName = `server.html`;
  res.sendFile(fileName, options);
  console.log(`Request - Method : ${req.method}`)
});
keepAliveApp.get(`/code/`, function (req, res) {
  res.sendStatus(403);
});

function keepAlive() {
  let end3 = timer();
  keepAliveApp.listen(3000, () => {
    let duration3 = end3();
    duration3 = duration3 * 1000;
    duration3 = Math.round(duration3);
    duration3 = duration3 + 1;
    duration3 = duration3 / 1000;
    console.emoji(`🖥 `, ` KeepAlive ON --- ` + duration3 + ` ms`);
  });
}

module.exports = keepAlive;