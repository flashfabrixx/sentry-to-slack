export const handler = async (req, res) => {
  res.status(200).json({ message: 'Hello from the edge!' });
};

export const runtime = 'edge';