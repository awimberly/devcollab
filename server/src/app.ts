import express from 'express';
import cors from 'cors';
import quickLinks from './routes/QuickLinks';
import testRoute from './routes/testRoute';

const app = express();
app.use(cors()); // ✅ Cross-origin requests (CORS)
app.use(express.json()); // ✅ Must be before any routes!
app.use('/api/quicklinks', quickLinks);
app.use('/test', testRoute);

export default app;
