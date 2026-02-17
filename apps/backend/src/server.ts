import { app } from './app.js';
import { env } from './config/env.js';

app.listen(env.PORT, () => {
  console.log(`Backend server is running on http://localhost:${env.PORT}`);
});
