import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/users.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API fonctionnelle' });
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});

export default app;