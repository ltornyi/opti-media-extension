import {raw} from 'body-parser';

export const imageBodyParser = raw({ type: ["image/jpeg", "image/png"], limit: "5mb" })