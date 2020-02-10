## Adverity recruitment app

### Backend setup
You need to have Docker installed.

Then, just run `./backend/run.sh`, and the backend will execute on port `3030` on the host machine.

An SQLite database is already included in the repository, however, if you need to load data yourself, there is a utility in `./backend/graphs/utils.py` to assist with that.

### Frontend setup
Go to `./frontend` and run `npm install` to get all the necessary dependencies. Then run `npm start`. The app should start.

The frontend has the backend host hard-coded as `127.0.0.1:3030`. I could've put it into a separate config file, but I didn't consider it that important for an app of this scale.
