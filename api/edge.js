export const config = {
  runtime: 'edge',
}

export default async (req) => {
  const body = await req.text()
  console.log(body)
  return new Response(`Hello from Edge.js! ${body}`)
}