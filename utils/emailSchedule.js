const schedule = require('node-schedule');
const Email = require('../server/db/models/email');
const { sendFirstEmail, sendUpdateEmail } = require('./announcements');

const startEmailService = async () => {
  const emails = await Email.findAll();

  emails.forEach(email => {
    const name = email.groupId + email.type;
    const minutes = email.time.slice(3);
    const hours = email.time.slice(0, 2);
    const days = email.days;
    const cron = `${minutes} ${hours} * ${days} *`;

    schedule.scheduleJob(name, cron, (fireDate) => {
      if (email.type === 'first') sendFirstEmail(email.groupId);
      else if (email.type === 'update') sendUpdateEmail(email.groupId);
      else sendFirstEmail(1);
      console.log(`Group ${email.groupId} ${email.type} email sent at ${fireDate}`);
    });
  });

  console.log('Email services running');
};

const stopEmailService = () => {
  const jobs = Object.values(schedule.scheduledJobs);
  jobs.forEach(j => {
    j.cancel();
  });

  console.log('Email services stopped');
};

const updateEmailService = async emailId => {
  const email = await Email.findById(emailId);

  const name = email.groupId + email.type;
  const minutes = email.time.slice(3);
  const hours = email.time.slice(0, 2);
  const days = email.days;
  const cron = `${minutes} ${hours} * ${days} *`;

  schedule.scheduledJobs[name].cancel();

  schedule.scheduleJob(name, cron, (fireDate) => {
    if (email.type === 'first') sendFirstEmail(email.groupId);
    else if (email.type === 'update') sendUpdateEmail(email.groupId);
    else sendFirstEmail(1);
    console.log(`${email.type} email sent at ${fireDate}`);
  });

  console.log(`Group ${email.groupId} ${email.type} email rescheduled for ${email.time}`);
};

module.exports = {
  startEmailService,
  stopEmailService,
  updateEmailService,
};
