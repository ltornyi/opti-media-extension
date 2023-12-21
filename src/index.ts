import express, {Request,Response,Application} from 'express';
import { checkSecrets } from './secrets/secrets';

const app:Application = express();
const PORT = process.env.PORT ?? 8000;

app.use(checkSecrets);

app.get("/", (req:Request, res:Response):void => {
  res.send("Hello World!")
});

app.listen(PORT, ():void => {
  console.log(`Server started, listening on http://localhost:${PORT}`);
});