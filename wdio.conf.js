export.config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // or 'eu' or 'apac'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};