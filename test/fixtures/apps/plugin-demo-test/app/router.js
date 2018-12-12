'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/success', controller.test.testSuccess);
  router.get('/failure', controller.test.testFailure);
};
