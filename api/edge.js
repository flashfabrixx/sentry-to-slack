import axios from 'axios'

export const config = {
  runtime: 'edge',
}

process.env.SLACK_ACCESS_TOKEN = "xoxb-3949805362081-6695316698354-4Y8ZOl4ITeMjH8yq8OlU9Qoe"
const slackClient = axios.create({
  baseURL: 'https://slack.com/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
  },
})

const sendMessage = async (channel, {level, formatted, environment, email,title, culprit, project}) => {
const isError = level === "error";
  const blocks = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `${isError? ":red_circle:" : ""} *${title}*`
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": `*Environment:*\n${environment}`
        },
        {
          "type": "mrkdwn",
          "text": `*Level:*\n${level}`
        },
        {
          "type": "mrkdwn",
          "text": `*Project:*\n${project}`
        }
      ]
    },
    
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": `*User:*\n${email}`
        }
      ]
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Message:*\n${formatted}`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Message:*\n${culprit}`
      }
    },
    {
      "type": "divider"
    },
  ];

  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      channel,
      blocks,
    }),
  });

  return response.data;
}
export default async (req) => {
  
  const body = await req.text()
  const {project,culprit, event:{level, logentry:{formatted}, user:{email}, environment,metadata :{title }}} = body;
  console.log({project, formatted})

  sendMessage(channelId, {level, formatted, environment, email,title, culprit, project});
  
  return new Response(`Hello from Edge.js! ${body}`)
}