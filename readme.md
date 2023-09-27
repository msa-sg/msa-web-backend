<h1>MSA Backend</h1>

![Build Status](https://github.com/msa-sg/msa-web-backend/actions/workflows/main.yml/badge.svg?branch=main)

- [Developers](#developers)
  - [Development](#development)
  - [CI/CD](#cicd)
  - [Deployment (Manual)](#deployment-manual)
  - [Testing](#testing)
    - [GitHub Workflow](#github-workflow)
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

### GitHub Workflow
If you are developing GitHub workflows, you may need to have a faster feedback loop to ensure your workflows run correctly. This is achieved with [Act](https://github.com/nektos/act) tool, which is the same as GitHub Workflow tool, except that it can run locally. Install it on your machine (follow the links provided in the website above). Create a file with the same format like `.env` and run
```bash
act -j build --secret-file <your-secret-file-loc>     # if you install on Windows or Linux
gh act -j build --secret-file <your-secret-file-loc>     # if you install on GitHub CLI (ie you have also installed gh)
```

The command basically runs a job named 'build', after supplying the local GitHub Action with the location of the secret file.

What should the secret file contain? In this example, go to the `.github` folder and find the workflow that has `build` job. Those expressions with a prefix of `secrets.` are the variables you should write in the secret file. For example, if you see `${{ secrets.DOCKER_USERNAME }}` in the job, your secret file should contain this line:
```
DOCKER_USERNAME=myusername
```

Note that Act cannot process variables like `${{ github.event.repository.name }}` as it is only available when the workflow is run on GitHub itself. Therefore, when testing locally, you can uncomment that line and replace it with a fixed name.

# Notes
## Hot Reload
Nodemon has a `-L` flag (`--legacy-watch`) in `package.json`. This is necessary as this app is run in Docker, which is has its own network. Legacy watch allows watching in networked environments.
