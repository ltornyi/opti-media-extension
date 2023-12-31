import express, {Application} from 'express';
import { checkSecrets } from './secrets/secrets';
import { router as routerV1 } from './v1/router';

const app:Application = express();
const PORT = process.env.PORT ?? 8000;

app.use(checkSecrets);

app.get("/", (req, res) => {
  res.send("Hello World!")
});

app.use("/ome/v1", routerV1);

app.listen(PORT, ():void => {
  console.log(`Server started, listening on http://localhost:${PORT}`);
});