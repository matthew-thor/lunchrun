const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const Run = require('../server/db/models/run');
const Group = require('../server/db/models/group');
const chalk = require('chalk');

const blueRedBg = text => { console.log(chalk.blue.bgRed.bold(text)); };

const today = moment(new Date()).format('YYYY-MM-DD');
// let siteUrl = 'http://looplunchrun.com';
let siteUrl = 'http://lunchrun.herokuapp.com';

if (process.env.NODE_ENV !== 'production') {
  require('../secrets');
  siteUrl = 'http://localhost:8080';
}

const sendAnnouncementEmail = (type, message, groupId) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'looplunchrun@gmail.com',
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: 'ya29.GlswBXkVOJLrL8cxNonRG6FllAa6BK7Xlev1nyGEPmaeB9Vs0czdpbU4YDfucTraKCJfheUyrk_n_qY-Bl-JIUy2hkqUYeiyQOSiEnz5k4SknAnr2S_DVNOCDwoa',
      expires: Date.now() + 3000,
    },
  },
    { from: '"Lunch Run 🏃‍" <looplunchrun@gmail.com>' }
  );

  transporter.sendMail(message, (err, info) => {
    if (err) console.log(err);
    else blueRedBg(`${type} email sent to group ${groupId}\n`, info);
  });
};

const sendFirstEmail = async groupId => {
  const group = await Group.findById(groupId);
  const members = await group.getMembers();
  const emails = members.map(u => u.email);

  const message = {
    to: emails,
    subject: `Lunch Run - who's in?`,
    html: `<h3>Are you in?</h3>
    <p>Login at <a href='${siteUrl}/'>Lunch Run</a> to RSVP and check the details!</p>`,
  };

  sendAnnouncementEmail('First', message, groupId);
};

const sendUpdateEmail = async groupId => {
  const run = await Run.find({
    where: {
      date: today,
      groupId,
    },
    include: [{ all: true }],
  });

  if (!run.participants.length) return 'no participants';

  const routeName = run.route ? run.route.name : 'TBA';
  const emails = run.participants.map(p => p.email);
  const participants = run.participants.map(p => {
    let returnString = `<li>${p.fullName}`;
    if (p.participant.comment) returnString += ` - ${p.participant.comment}`;
    return returnString + '</li>';
  }).join('');
  const startTime = run.startTime;

  const message = {
    to: emails,
    subject: `Lunch Run - today's route`,
    html: `<h3>Today's route: ${routeName}</h3>
    <h3>Start time: ${startTime}</h3>
    <ul><h4>Who's in?</h4>${participants}</ul>
    <h4>Changed your mind? Update your RSVP at <a href='${siteUrl}/'>Lunch Run</a></h4>`,
  };

  sendAnnouncementEmail('Update', message, groupId);
};

module.exports = {
  sendFirstEmail,
  sendUpdateEmail,
  sendAnnouncementEmail,
};
