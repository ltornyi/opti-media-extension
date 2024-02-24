# Opti media extension server

## Development

Run `npm run dev` to start local dev server. Sharp module was pinned to version 0.32.6 - 0.33.x requires node18+.

## Key management

The service expects a valid client API key to be passed to each request in the `opti-api-key` header. Generate a new key with the `generate_key.js` utility. It prints the API key that should be used in the client calling the service. The utility also prints the generated hash and salt to be stored in `config/apikeys.json`. The structure of this file is an array of objects with a "client" and a "secret" attribute.

## Tests

    curl http://localhost:8000/ -H "opti-api-key: <your api key>"

    curl -X POST "http://localhost:8000/ome/v1/resize?width=400&fit=contain&height=400" \
      -H "opti-api-key: <your api key>" \
      -H "Content-Type: image/png" \
      --data-binary @imgs/pexels.png >> imgs/pexels-resize-response.png

    curl -X POST "http://localhost:8000/ome/v1/rotate" \
      -H "opti-api-key: <your api key>" \
      -H "Content-Type: image/png" \
      --data-binary @imgs/pexels.png >> imgs/pexels-resize-response.png

## Production build

Run `npm run build` to generate a single .js for production (it will include apikeys.json as well).

## Run as a pm2 service

pm2 start ./dist/index.js --name opti-media-extension -i 2 --time

## V1 media APIs

all under `/ome/v1`

POST the image to be processed as the request body. Current implementation handles JPEG, PNG, GIF and WebP; set the content-type header accordingly. Response will be the processed image in the original format.

| API example | Usage |
| ----------- | ----------- |
| POST /resize?width=400&height=200&fit=contain |  See [Sharp doc](https://sharp.pixelplumbing.com/api-resize) for valid values of fit. |
| POST /rotate?angle=90 | angle is optional; if missing, it's treated as 90 |

## V1 document APIs

all under `/ode/v1`

POST the document to be processed as the request body.

| API example | Usage |
| ----------- | ----------- |
| POST /html2pdf |  Response is the PDF version of the HTML received. |

## References

[Key management idea](https://shahid.pro/blog/2021/09/22/how-to-generate-api-key-and-secret-to-protect-api/)

[Vercel/ncc compiler](https://github.com/vercel/ncc)

[Sharp home](https://sharp.pixelplumbing.com)

[Puppeteer API](https://pptr.dev/api/puppeteer.puppeteernode)