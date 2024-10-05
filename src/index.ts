import express, {Application} from 'express';
import { checkSecrets } from './secrets/secrets';
import { router as omeRouterV1 } from './ome/v1/router';
import { router as odeRouterV1 } from './ode/v1/router';
import { errorHandler } from './common/error';
import { logInfo, LogLevel, setLogLevel } from './common/logging';

const app:Application = express();
const PORT = process.env.PORT ?? 8000;

const args = process.argv.slice(2);
setLogLevel(args[0] as LogLevel)
logInfo(`args: ${args}`)

app.use(checkSecrets);

app.get("/", (req, res) => {
  logInfo('sending Hello World response');
  res.send("Hello World!")
});

app.use("/ome/v1", omeRouterV1);
app.use("/ode/v1", odeRouterV1);
app.use(errorHandler)

app.listen(PORT, ():void => {
  logInfo(`Server started, listening on http://localhost:${PORT}`);
});