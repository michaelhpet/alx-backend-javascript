import express from 'express';
import useRoutes from './routes';

const HOSTNAME = 'localhost';
const PORT = 1245;

const app = express();

useRoutes(app);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening at http://${HOSTNAME}:${PORT}`);
});

export default app;
module.exports = app;
