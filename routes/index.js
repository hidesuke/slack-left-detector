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
  const token = req.body.token;
  const user = req.body.event.user;
  const channel = req.body.event.channel;
  const URL = 'https://slack.com/api/channels.invite';
  try {
    const ret = await axios({
      url: URL,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.botAccessToken}`,
      },
      params: {
        user,
        channel,
      },
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
  if (req.body.type === 'url_verification') return challenge(req, res);
  if (!req.body.event) return res.status(200);
  if (req.body.event.type !== 'member_left_channel') return res.status(200);
  return reinvite(req, res);
});

module.exports = router;