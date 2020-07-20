# [WIP] Amplify Starter App

A quickstart Amplify app with custom authentication workflow

## Setup

Create dotenv
```sh
cp sample.env .env
```

Install dependencies:
```sh
yarn
```

Initialize Amplify:
```sh
amplify init
```

Deploy Authentication resources:
```sh
amplify add auth
amplify push
```

Start the dev server:
```sh
yarn start
```

## Todo

- [ ] Fix login redirect
- [ ] Finish Signup (email confirmation)
- [ ] Handle temp password
- [ ] Handle verify on login
- [ ] Finish Remember Me
- [ ] Add profile page
- [ ] Add CRUD example
