const sendInviteEmail = require('./invites');
const {
  sendFirstEmail,
  sendUpdateEmail,
 } = require('./announcements');
const {
  startEmailService,
  stopEmailService,
  updateEmailService,
} = require('./emailSchedule');
const chalk = require('chalk');

const blueRedBg = text => { console.log(chalk.blue.bgRed.bold(text)); };
const blue = text => { console.log(chalk.blue.bold(text)); };
const testClog = (...args) => {
  const text = args.join(' ');

  blueRedBg('~!~!~!~!~!~\n');
  console.log(text);
  blueRedBg('\n~!~!~!~!~!~');
};

module.exports = {
  blueRedBg,
  blue,
  testClog,
  sendInviteEmail,
  sendFirstEmail,
  sendUpdateEmail,
  startEmailService,
  stopEmailService,
  updateEmailService,
};
