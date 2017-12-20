const chalk = require('chalk');

const blueRedBg = text => { console.log(chalk.blue.bgRed.bold(text)); };
const blue = text => { console.log(chalk.blue.bold(text)); };
const testClog = text => {
  blueRedBg('~!~!~!~!~!~\n');
  console.log(text);
  blueRedBg('\n~!~!~!~!~!~');
};

module.exports = { blueRedBg, blue, testClog };
