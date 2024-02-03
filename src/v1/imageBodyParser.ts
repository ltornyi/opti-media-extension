import {raw} from 'body-parser';

export const imageBodyParser = raw({ type: ["image/jpeg", "image/png", "image/gif", "image/webp"], limit: "10mb" })