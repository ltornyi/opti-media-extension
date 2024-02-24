import {text} from 'body-parser';

export const htmlBodyParser = text({ type: ["text/html"], limit: "10mb" })