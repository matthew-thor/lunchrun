const nodemailer = require('nodemailer');

// let siteUrl = 'http://looplunchrun.com';
let siteUrl = 'http://lunchrun.herokuapp.com';

if (process.env.NODE_ENV !== 'production') {
  require('../secrets');
  siteUrl = 'http://localhost:8080';
}

module.exports = (temp, email) => {
  const message = {
    to: email,
    subject: 'Lunch Run Password Reset',
    html: `<p>Your Lunch Run password has been reset. Please <a href='${siteUrl}/login'>login</a> with the temporary password <b>${temp}</b> to change your password.</p>
      <p>Didn't request a reset? <a href='mailto:mjthor@gmail.com'>Let the admins know ASAP.</a></p>`,
  };

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
    else console.log(`Password reset email sent to ${email}\n`, info);
  });
};

/* Code below is for testing purposes. Does not actually send any emails ----------

nodemailer.createTestAccount((err, account) => {
  if (err) console.log(err);

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass,  // generated ethereal password
    },
  });

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(info);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
});
---------- */

