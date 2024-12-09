import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/login', async (req: Request, res: Response) => {
  try {
    const response = await axios.post('http://localhost:4000/auth', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with backend:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Middleware server running on http://localhost:${PORT}`);
});
