# [WIP] Amplify Starter App

A quickstart Amplify application

## Features
 - [x] Built with [Create React App](https://github.com/facebook/create-react-app#create-react-app--)
 - [x] Public and private routes via [React Router](https://reactrouter.com/web/guides/quick-start)
 - [x] Complete authentication workflow via [Amplify Authentication](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js)
 - [x] Auth UI made with [Chakra UI](https://chakra-ui.com/getting-started) & [React Use Form Hook](https://react-hook-form.com/api)
 - [ ] Complete CRUD workflow via [Amplify GraphQL API](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js)
 - [ ] Analytics via [Amplify Analytics](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js)

## Setup

### Prerequisits
 - Create an [AWS Account](https://aws.amazon.com/)
 - Install and configure [Amplify CLI](https://docs.amplify.aws/cli/start/install)

### Step 1: Copy the example environment file
```sh
cp .env.example .env
```

### Step 2: Initialize AWS Amplify and provision resources
```sh
amplify init
amplify add auth
amplify push
```

### Optional: Seed sample data
_Coming Soon_

### Step 3: Install dependencies and start the development server
```sh
yarn
yarn start
```

## Customizing

- Modifying the `.env` allows you to change many aspects of the application
- Modifying the `src/theme.js` allows you to customize the application theme
- Modifying the Amplify services configurations allows you to further customize the application

## Todo
- [ ] Distinct username and email
- [ ] Remember Me
- [ ] Resend token
- [ ] Dot env
