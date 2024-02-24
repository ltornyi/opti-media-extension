import express, {Application} from 'express';
import { checkSecrets } from './secrets/secrets';
import { router as omeRouterV1 } from './ome/v1/router';
import { router as odeRouterV1 } from './ode/v1/router';
import { errorHandler } from './common/error';

const app:Application = express();
const PORT = process.env.PORT ?? 8000;

app.use(checkSecrets);

app.get("/", (req, res) => {
  res.send("Hello World!")
});

app.use("/ome/v1", omeRouterV1);
app.use("/ode/v1", odeRouterV1);
app.use(errorHandler)

app.listen(PORT, ():void => {
  console.log(`Server started, listening on http://localhost:${PORT}`);
});