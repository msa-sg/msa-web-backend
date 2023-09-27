<h1>MSA Backend</h1>

![Build Status](https://github.com/msa-sg/msa-web-backend/actions/workflows/ci.yml/badge.svg?branch=main)

- [Developers](#developers)
  - [Development](#development)
  - [CI/CD](#cicd)
  - [Deployment (Manual)](#deployment-manual)
  - [Testing](#testing)
- [Notes](#notes)
  - [Hot Reload](#hot-reload)


# Developers
Config files are created to modularly set up different environments. By default, the environment is read from `config/default.json`. Instructions before running each phase:

## Development
Nodemon is used to monitor file changes, thus giving you faster feedback during development. Docker-compose is used so that you can test your changes with a local database (ie. on your machine) for faster development. In any terminal,
```bash
docker-compose up --build --remove-orphans # run every time you want to develop. Add -d flag if you want to see the output in Docker desktop's window
```

When you are taking a break, tear down the compose with
```bash
docker-compose down
```

## CI/CD
GitHub Actions will test the code and generate the latest image in Docker Hub (set to one person) if the branch is "main".

## Deployment (Manual)
The `docker-compose.prod.yml` file builds on `docker-compose.yml`. The order of the files below matters, as we want the configs in the latter filename to overwrite conflicting configs.
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up # add --build flag if you just edited docker-compose or Dockerfile
```

## Testing
To check before pushing to GitHub, run
```bash
docker compose -f docker-compose-test.yml run intg-test-server npm test --exit-code-from --remove-orphans
```

You can also run `npm test` locally, but make sure to start its dependencies (MongoDB in this case) before running the script.

The order of loading the config files is determined by `NODE_ENV` environment variable. Currently, it is set in `package.json` before executing the relevant commands (see `script` object in the file). The names of the config should match the corresponding `EXT` in the `.env.{EXT}` files. To fully understand how Config finds the correct file, read the order list in the official [GitHub page](https://github.com/node-config/node-config/wiki/Configuration-Files#file-load-order).

# Notes
## Hot Reload
Nodemon has a `-L` flag (`--legacy-watch`) in `package.json`. This is necessary as this app is run in Docker, which is has its own network. Legacy watch allows watching in networked environments.
