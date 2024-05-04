export const config = {
  runtime: 'edge',
}

export default (req) => {
  console.log(req.body)
  return {
    status: 200,
    body: req.body,

  }
}