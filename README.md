# [WIP] Amplify Starter App

A quickstart Amplify app with custom authentication workflow

## Features
 - [x] Complete authentication workflow via [Amplify Authentication](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#authentication-with-amplify)
 - [x] Custom Auth UI made with [Chakra UI](https://chakra-ui.com/getting-started) & [React Use Form Hook](https://react-hook-form.com/api)
 - [ ] Responsive UI
 - [ ] Complete CRUD workflow via [AWS Appsync]()

## Setup

### Step 1: Create dotenv
```sh
cp sample.env .env
```

### Step 2: Install dependencies
```sh
yarn
```

### Step 3: Initialize Amplify
```sh
amplify init
```

### Step 4: Startup AWS resources
```sh
amplify add auth
amplify push
```

### Step 5: Start the development server
```sh
yarn start
```

## Todo

- [ ] Remember Me
- [ ] Resend token
