const schedule = require('node-schedule');
const Email = require('../server/db/models/email');
const Group = require('../server/db/models/group');
const Run = require('../server/db/models/run');
const { sendFirstEmail, sendUpdateEmail } = require('./announcements');
const chalk = require('chalk');

const blue = text => { console.log(chalk.blue.bold(text)); };

const startEmailService = async () => {
  const emails = await Email.findAll();

  emails.forEach(email => {
    const name = email.groupId + email.type;
    const minutes = email.time.slice(3);
    const hours = process.env.NODE_ENV !== 'production'
      ? email.time.slice(0, 2)
      : Number(email.time.slice(0, 2)) + 6;
    const days = email.days;
    const cronFormat = `${minutes} ${hours} * * ${days}`;

    schedule.scheduleJob(name, cronFormat, (fireDate) => {
      if (email.type === 'first') sendFirstEmail(email.groupId);
      else if (email.type === 'update') sendUpdateEmail(email.groupId);
      else sendFirstEmail(1);
      blue(`Group ${email.groupId} ${email.type} email sent at ${fireDate}`);
    });
  });

  blue('Started email service');
};

const stopEmailService = () => {
  const jobs = Object.values(schedule.scheduledJobs);
  jobs.forEach(j => {
    j.cancel();
  });

  blue('Stopped email service');
};

const updateEmailService = async emailId => {
  const email = await Email.findById(emailId);

  const name = email.groupId + email.type;
  const minutes = email.time.slice(3);
  const hours = process.env.NODE_ENV !== 'production'
    ? email.time.slice(0, 2)
    : Number(email.time.slice(0, 2)) + 6;
  const days = email.days;
  const cronFormat = `${minutes} ${hours} * * ${days}`;

  schedule.scheduledJobs[name].cancel();

  schedule.scheduleJob(name, cronFormat, (fireDate) => {
    let res;
    if (email.type === 'first') res = sendFirstEmail(email.groupId);
    if (email.type === 'update') res = sendUpdateEmail(email.groupId);

    if (!res) console.log(chalk.blue.bgRed.bold(`No participants for ${email.groupId}, email not sent`));
    else blue(`${email.type} email sent at ${fireDate}`);
  });

  blue(`Group ${email.groupId} ${email.type} email rescheduled for ${email.time}`);
};

const createRunsAtMidnight = () => {
  schedule.scheduleJob('midnightRunCreation', '1 0 * * *', async (fireDate) => {
    const groups = await Group.findAll();
    const newRuns = await Promise.all(groups.map(g => Run.create({ groupId: g.id })));
    blue(`New runs created for ${groups.length} groups at ${fireDate}`);
  });

  blue('Started run creation service');
};

module.exports = {
  startEmailService,
  stopEmailService,
  updateEmailService,
  createRunsAtMidnight,
};
