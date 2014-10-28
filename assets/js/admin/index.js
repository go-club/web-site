var path = window.location.pathname;

switch (path) {
    case '/users':
        require('./users');
        break;

    default:
        throw new Error('Unknown pathname:' + path);
}
