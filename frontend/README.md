This is SuperPrice's frontend. It is a React app that uses Chakra UI for
styling. See the following commands for how to run the app.

## Available Scripts

Please run `npm install` before running any of the following commands.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### Building the Docker image

To build the Docker image, run the following command:

```bash
docker build -t superprice-frontend .
```

### Running the Docker image

To run the Docker image, run the following command:

```bash
docker run -p 3000:3000 superprice-frontend
```

You can override the env variables by passing them in as arguments to the
`docker run` command. For example, to override the `REACT_APP_USER_SERVICE_URL` variable, run the following command:

```bash
docker run -p 3000:3000 -e REACT_APP_USER_SERVICE_URL=123.123.1234/user-service superprice-frontend
```
