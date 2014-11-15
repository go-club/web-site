
function home(req, res, next) {
    res.renderTruth();
}

module.exports = function(router) {

    router.get('/', home);
    return router;
};