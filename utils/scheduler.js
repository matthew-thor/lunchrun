const schedule = require('node-schedule');
const Email = require('../server/db/models/email');
const Group = require('../server/db/models/group');
const Run = require('../server/db/models/run');
const { sendFirstEmail, sendUpdateEmail } = require('./announcements');

const startEmailService = async () => {
  const emails = await Email.findAll();

  emails.forEach(email => {
    const name = email.groupId + email.type;
    const minutes = email.time.slice(3);
    const hours = email.time.slice(0, 2);
    const days = email.days;
    const cron = `${minutes} ${hours} * * ${days}`;

    schedule.scheduleJob(name, cron, (fireDate) => {
      if (email.type === 'first') sendFirstEmail(email.groupId);
      else if (email.type === 'update') sendUpdateEmail(email.groupId);
      else sendFirstEmail(1);
      console.log(`Group ${email.groupId} ${email.type} email sent at ${fireDate}`);
    });
  });

  console.log('Started email service');
};

const stopEmailService = () => {
  const jobs = Object.values(schedule.scheduledJobs);
  jobs.forEach(j => {
    j.cancel();
  });

  console.log('Stopped email service');
};

const updateEmailService = async emailId => {
  const email = await Email.findById(emailId);

  const name = email.groupId + email.type;
  const minutes = email.time.slice(3);
  const hours = email.time.slice(0, 2);
  const days = email.days;
  const cron = `${minutes} ${hours} * * ${days}`;

  schedule.scheduledJobs[name].cancel();

  schedule.scheduleJob(name, cron, (fireDate) => {
    if (email.type === 'first') sendFirstEmail(email.groupId);
    else if (email.type === 'update') sendUpdateEmail(email.groupId);
    else sendFirstEmail(1);
    console.log(`${email.type} email sent at ${fireDate}`);
  });

  console.log(`Group ${email.groupId} ${email.type} email rescheduled for ${email.time}`);
};

const createRunsAtMidnight = () => {
  schedule.scheduleJob('midnightRunCreation', '1 0 * * *', async (fireDate) => {
    const groups = await Group.findAll();
    const newRuns = await Promise.all(groups.map(g => Run.create({ groupId: g.id })));
    console.log(`New runs created for ${groups.length} groups at ${fireDate}`);
  });

  console.log('Started run creation service');
};

module.exports = {
  startEmailService,
  stopEmailService,
  updateEmailService,
  createRunsAtMidnight,
};
