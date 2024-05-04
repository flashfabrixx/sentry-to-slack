export const config = {
  runtime: 'edge',
}

export default (req) => {
  console.log(req.body)
  return new Response(`Hello from Edge.js! ${JSON.stringify(req.body)}`)
}