# Opti media extension server

## Development

Run `npm run dev` to start local dev server.

## Key management

The service expects a valid client API key to be passed to each request in the `opti-api-key` header. Generate a new key with the `generate_key.js` utility. It prints the API key that should be used in the client calling the service. The utility also prints the generated hash and salt to be stored in `config/apikeys.json`.

## Production build

Run `npm run build` to generate a single .js for production (it will include apikeys.json as well).

## References

[Key management idea](https://shahid.pro/blog/2021/09/22/how-to-generate-api-key-and-secret-to-protect-api/)

[Vercel/ncc compiler](https://github.com/vercel/ncc)