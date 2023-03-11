# immutable-wallet-app
A simple wallet app built using React Native for the Altura React Native trial.

# project layout
There are 2 core projects involved in this project.

The `/api` project hosts our REST api, this API uses JSON and allows us to communicate sensitive data between third parties and our mobile app.

The `/app` project hosts our mobile app built with React Native and uses our API project as the core method of communication with the outside world.

# technical decisions
There are a number of technical decisions I made whilst building this project, I have outlined them below to give some insight into thoughts and problem-solving.

1. I built a basic REST API to serve blockchain / web3 specific data, there were a number of issues around support and capabilities from existing packages that handle mnemonics (recovery phrases) and web3 related functionality such as inability to support React Native.
2. I implemented Redux for state management, I chose to do this because we had future scalability and updates in mind and caching local states is core for a functional app.
3. I decided not to implement authentication into the app yet, this is because it is not necessary for the existing end points but will be required in the future if we were to expand the API and app.
4. We should only get 1 account for now, this can be improved in the future but most users only have 1 account anyway, 1 account can have multiple tokens and this is handled regardless.

# what could be done differently
If I were to do this project again with more time or more focus on specifics, there are a number of things I would focus on to improve my existing project.

1. I would use [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) alongside Redux, this framework comes bundled with [Redux toolkit](https://redux-toolkit.js.org/) and allows us to query API end points alongside caching responses and accessing data easily without duplicating axios multiple times throughout the project. I would use this because not only would it improve our performance of the website, but it stops replication throughout the code as the queries now rely on React hooks.
2. I would add authentication to the API, due to the nature of this project we do not need authentication at the moment, however, as we expand the API we'd need to restrict certain parts of the API and certain content, as a result I would choose JWT tokens as the standard for this due to the lack of reliance on an API to validate authenticity.
3. I would build the API to use microservices for future scalability when using cloud infrastructure
4. I would build out the infrastructure using LocalStack and Docker to emulate AWS, as a result we can include more content and appropriate testing with backend support.
5. Add a more secure approach to storing the secret key for encrypted state management, this is more complex and I unfortunately ran out of time. 
6. Add testing to React Native (I did not have enough time as per the time specified), however, I have added basic testing to the API
# security
We have a number of processes in place to securely store and access sensitive data within the app.

1. We use env variables to store system critical credentials such as access tokens, these are stored server side on our own API so no one but us has access to them.
2. We encrypt all our state data within the app, we use a secret key (which in the future would be generated client side) to encrypt all state data to make it difficult for attackers to access private keys and other sensitive data such as access tokens in the future. This will use the Keychain on device going forward for an extra layer of security.
3. We will in future be expanding to add access tokens and refresh tokens and JWT standards to our API to allow a more secure API experience.

# publishing the app / api
There are a number of steps to publish an app to the app store, this also includes publishing the API too.

## api
The api would be hosted on the cloud for ease of use, this would be deployed using CI/CD when you merge into `master`/`main`.

This would be hosted on AWS in this case and would use the following services:
- `eks`
- `api gateway`
- `route 53`

## app
The steps to publish an app to the app store depend entirely on the app store you're publishing too, this is determined based on operating system to Apple Store or Google Play store.

A high level view of app publishing would suggest you follow these basic steps to publish an app:
1. Set up the store page, this is usually done prior to release of an app which could include the app name, logo etc..
2. Configure your app ID, this is usually achieved at the beginning of app project setup and can be located in `app.json`
3. Take screenshots of the app to use on the app store submission
4. Submit to the app store for review
5. Make any appropriate changes requested by the app store team
6. Publish to the world

An example of a previous app I released for a large company called UL (Underwriters Laboratories) had quite a few issues due to the use of Cordova which was built by a different engineer and I had to maintain and build new features on top, for a while the app would not build or be approved by the app stores and I had to spend weeks going through and manually editing code to get it up to standard.
