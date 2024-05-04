export const config = {
  runtime: 'edge',
}
const {sendMessage} = require('./sendMessage')

export default async (req) => {
  const body = await req.text()
  const {project,culprit, event:{level, logentry:{formatted}, user:{email}, environment,metadata :{title }}} = body;
  console.log({project, formatted})

  sendMessage(channelId, {level, formatted, environment, email,title, culprit, project});
  
  return new Response(`Hello from Edge.js! ${body}`)
}