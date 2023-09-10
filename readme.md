<h1>MSA Backend</h1>

- [Developers](#developers)
  - [Development](#development)
  - [Testing](#testing)


# Developers
Config files are created to modularly set up different environments. By default, the environment is read from `config/default.json`. Instructions before running each phase:

## Development
Nodemon is used to monitor file changes, thus giving you faster feedback during development. Nevertheless, it's written into npm script, so you just need to set the environment to `dev`. On Linux,
```bash
NODE_ENV=dev npm run dev
```
On Windows,
```
set NODE_ENV; npm run dev
```

## Testing
Simply run
```bash
npm start
```
to use the default config file.