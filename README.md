# [WIP] Amplify Starter App

A quickstart Amplify app with custom authentication workflow

## Features
 - [x] Complete authentication workflow via [Amplify Authentication](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#authentication-with-amplify)
 - [x] Custom Auth UI made with [Chakra UI](https://chakra-ui.com/getting-started) & [React Use Form Hook](https://react-hook-form.com/api)
 - [ ] Responsive UI
 - [ ] Complete CRUD workflow via [AWS Appsync]()

## Setup

You'll need to install [Amplify CLI](https://docs.amplify.aws/cli/start/install) prior to setup

### Step 1: Copy the example environment file
```sh
cp .env.example .env
```

### Step 2: Install dependencies
```sh
yarn
```

### Step 3: Initialize AWS Amplify and provision resources
```sh
amplify init
amplify add auth
amplify push
```

### Step 4: Start the development server
```sh
yarn start
```

## Todo
- [ ] Remember Me
- [ ] Resend token
