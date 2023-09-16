<h1>MSA Backend</h1>

- [Developers](#developers)
  - [Development](#development)
  - [Deployment](#deployment)
  - [Testing](#testing)


# Developers
Config files are created to modularly set up different environments. By default, the environment is read from `config/default.json`. Instructions before running each phase:

## Development
Nodemon is used to monitor file changes, thus giving you faster feedback during development. Docker-compose is used so that you can test your changes with a local database (ie. on your machine) for faster development. In any terminal,
```bash
docker-compose build  # run once only when docker-compose.yml is changed
docker-compose up -d  # run every time you want to develop
```

When you are taking a break, tear down the compose with
```bash
docker-compose down
```

## Deployment
The `docker-compose.prod.yml` file builds on `docker-compose.yml`. The order of the files below matters, as we want the configs in the latter filename to overwrite conflicting configs.
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## Testing
