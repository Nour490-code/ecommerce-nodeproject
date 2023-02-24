import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './handlers/users.handler';
import db from './services/database.service';
dotenv.config();
db;
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
userRoutes(app);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
