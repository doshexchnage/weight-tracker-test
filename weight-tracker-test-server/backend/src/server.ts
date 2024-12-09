import express, { Request, Response } from 'express';
import MongoDB from './mongoose';
import Client from './models/Weight'; 

const app = express();
const PORT = 4000;

app.use(express.json());

// Initialize the database connection
MongoDB;

// Sample route for authentication
app.post('/auth', (req: Request, res: Response) => {
  // Process the request and respond
  console.log('Received login details:', req.body);
  res.json({ message: 'Authentication successful' });
});

// Route to get all clients
app.get('/clients', async (req: Request, res: Response) => {
  try {
    const clients = await Client.find(); // Fetch all clients from the database
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Error fetching clients', error });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
