const schedule = require('node-schedule');
const Email = require('../server/db/models/email');
const { sendFirstEmail, sendUpdateEmail } = require('./announcements');

const startEmailService = async () => {
  const emails = await Email.findAll();

  emails.push({
    groupId: 1,
    type: 'test',
    time: '12:00',
  });

  emails.forEach(email => {
    const name = email.groupId + email.type;
    const minutes = email.time.slice(3);
    const hours = email.time.slice(0, 2);
    const days = '1-5';
    let cron = `${minutes} ${hours} * ${days} *`;

    if (name === '1test') cron = '*/5 * * * * *';

    schedule.scheduleJob(name, cron, (fireDate) => {
      if (email.type === 'first') sendFirstEmail(email.groupId);
      else if (email.type === 'update') sendUpdateEmail(email.groupId);
      else sendFirstEmail(1);
      console.log(`${email.type} email sent at ${fireDate}`);
    });
  });

  console.log('Email services running');
};

const stopEmailService = () => {
  const jobs = Object.values(schedule.scheduledJobs);
  setTimeout(() => {
    jobs.forEach(j => {
      console.log(j.name, 'canceled');
      j.cancel();
    });
  }, 7000);
};


module.exports = {
  startEmailService,
  stopEmailService,
  // updateEmailService,
};
