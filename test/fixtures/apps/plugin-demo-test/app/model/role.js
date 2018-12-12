'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const Role = new Schema({
    name: { // 名称
      type: String,
    },
    desc: { // 描述
      type: String,
    },
    resources: [{
      type: Schema.Types.ObjectId,
      ref: 'resource', // 拥有资源
    }],
    status: { // 状态 false-不可用，true-可用
      type: Boolean,
      default: true,
    },
    default: { // 默认 false-不默认，true-默认
      type: Boolean,
      default: false,
    },
  }, { versionKey: false });

  return mongoose.model('role', Role);
};
