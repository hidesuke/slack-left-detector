const express = require('express');
const router = express.Router();
const axios = require('axios');

const challenge = (req, res) => {
  const challenge = req.body.challenge;
  const token = req.body.token;
  return res.json({
    challenge,
  });
};

const reinvite = async (req, res) => {
  const user = req.body.user;
  const channel = req.body.channel;
  const URL = 'https://slack.com/api/channels.invite';
  try {
    const ret = await axios.post(URL, {
      token: process.env.SLACK_TOKEN,
      user,
      channel,
    });
    console.log(ret);
    return res.status(200);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

router.post('/slack-event', (req, res, next) => {
  console.log(req.body);
  const type = req.body.type;
  if (type === 'url_verification') return challenge(req, res);
  if (type !== 'member_left_channel') return res.status(200);
  return reinvite(req, res);
});

module.exports = router;