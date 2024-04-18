# TASK 2 - Backend
## Set up Backend
Clone the repository using following command
```
git clone -b Task-2-BE {git-url-https}
```

To install dependency, open terminal
```
npm install
```

Create .env file. Example file:
```
PORT = 8080
ACCESS_TOKEN_KEY = "YOUR_ACCESS_TOKEN_KEY"
REFRESH_TOKEN_KEY = "YOUR_REFRESH_TOKEN_KEY"
ACCESS_TOKEN_EXPIRES_TIME="7d"
REFRESH_TOKEN_EXPIRES_TIME="30d"
MONGO_DB="YOUR_MONGODB_URI"
```

To start the server
```
npm start
```
