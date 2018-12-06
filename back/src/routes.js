async function register(server) {
    server.route([
        {
            method: 'GET',
            path: '/',
            config: {
                auth: {
                    strategies: ['keycloak-jwt']
                },
                cors: true,
                handler() {
                    return "hello world"
                }
            }
        }
    ]);
}

module.exports = {
    register,
    name: 'example-routes',
    version: '0.0.1'
};