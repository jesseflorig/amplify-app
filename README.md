# [WIP] Amplify Starter App

A quickstart Amplify app with custom authentication workflow

## Features
 - Full authentication workflow via [Amplify Auth API](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#authentication-with-amplify)
 - Custom Auth UI made with [Chakra UI]() & [React Use Form Hook]()

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
- [ ] Show/Hide password
- [ ] Password character count
- [ ] Resend token
- [ ] Add profile page
- [ ] Add CRUD example
