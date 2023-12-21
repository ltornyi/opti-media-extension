# Opti media extension server

## Development

Run `npm run dev` to start local dev server. Sharp module was pinned to version 0.32.6 - 0.33.x requires node18+.

## Key management

The service expects a valid client API key to be passed to each request in the `opti-api-key` header. Generate a new key with the `generate_key.js` utility. It prints the API key that should be used in the client calling the service. The utility also prints the generated hash and salt to be stored in `config/apikeys.json`.

## Production build

Run `npm run build` to generate a single .js for production (it will include apikeys.json as well).

## V1 APIs

all under `/ome/v1`

| API example | Usage |
| ----------- | ----------- |
| POST /resize?width=400&height=200&fit=contain | POST the image to be processed as the request body. Current implementation handles JPEG and PNG; set the content-type header accordingly. See [Sharp doc](https://sharp.pixelplumbing.com/api-resize) for valid values of fit. Response will be the processed image in the original format.|

## References

[Key management idea](https://shahid.pro/blog/2021/09/22/how-to-generate-api-key-and-secret-to-protect-api/)

[Vercel/ncc compiler](https://github.com/vercel/ncc)

[Sharp home](https://sharp.pixelplumbing.com)