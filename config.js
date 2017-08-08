const config = {
    port: 3000,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    redisPort: 6379,
    routes: {
        login: '/login',
        logout: '/logout'
    }
};

module.exports = config;