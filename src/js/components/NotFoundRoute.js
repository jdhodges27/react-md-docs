export default {
  path: '*',
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require('./NotFound').default);
    });
  },
};
