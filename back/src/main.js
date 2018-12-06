import hapi from 'hapi'
import authKeycloak from 'hapi-auth-keycloak'
import routes from './routes'

const server = hapi.server({ port: 3000 });

const options = {
    realmUrl: 'http://localhost:8080/auth/realms/crm',
    clientId: 'test-hapi',
    minTimeBetweenJwksRequests: 15,
    cache: false,
    userInfo: ['name', 'email']
};

process.on('SIGINT', async () => {
    try {
        await server.stop();
    } catch (err) {
        process.exit(err ? 1 : 0);
    }
});

(async () => {
    try {
        await server.register({ plugin: authKeycloak, options });
        server.auth.strategy('keycloak-jwt', 'keycloak-jwt');
        await server.register({ plugin: routes });
        await server.start();
        console.log('Server started successfully');
    } catch (err) {
        console.error(err);
    }
})();
