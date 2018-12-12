'use strict';
const Service = require('../../../../../../index').BaseService;

class RoleService extends Service {
  constructor(ctx) {
    super({ ctx, model: 'Role' });
  }

  find(where, pager) {
    const model = this.ctx.model[ this.model ];
    Service.clearEmpty(where);
    Service.fuzzyWhere(where, [ 'name' ]);
    if (pager.pageAll) {
      return Promise.all([
        model.find(where).countDocuments(),
        model.find(where).sort({ _id: -1 }),
      ]);
    }
    return Promise.all([
      model.find(where).countDocuments(),
      model.find(where).sort({ _id: -1 })
        .skip((pager.pageIndex - 1) * pager.pageSize)
        .limit(pager.pageSize),
    ]);
  }
}

module.exports = RoleService;
