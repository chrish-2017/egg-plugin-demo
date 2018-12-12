'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('test/plugin-demo.test.js', () => {
  let app;
  let ctx;
  before(async () => {
    app = mock.app({
      baseDir: 'apps/plugin-demo-test',
    });
    app.ready();
    const mongoServer = new MongodbMemoryServer();
    const uri = await mongoServer.getConnectionString();
    await app.mongoose.connect(uri, { useNewUrlParser: true });
    ctx = app.mockContext();
  });

  after(() => app.close());

  describe('GET /', () => {
    it('should GET /', () => {
      return app.httpRequest()
        .get('/')
        .expect('hi, pluginDemo')
        .expect(200);
    });
    afterEach(mock.restore);
  });

  describe('GET /success', () => {
    it('should GET /success', () => {
      return app.httpRequest()
        .get('/success')
        .expect({
          code: '000000',
          description: 'SUCCESS',
        })
        .expect(200);
    });
    afterEach(mock.restore);
  });

  describe('GET /failure', () => {
    it('should GET /failure', () => {
      return app.httpRequest()
        .get('/failure')
        .expect({
          code: '10001',
          description: '用户名或密码错误',
        })
        .expect(200);
    });
    afterEach(mock.restore);
  });

  describe('create', () => {
    let _id;
    it('should create', async () => {
      const role = await ctx.service.roles.create({
        name: '单元测试',
      });
      _id = role._id;
      const result = await ctx.service.roles.findOne({ _id });
      assert(result.name === '单元测试');
    });
    afterEach(async () => {
      mock.restore();
      await ctx.service.roles.deleteOne({ _id });
    });
  });

  describe('update', () => {
    let _id;
    beforeEach(async () => {
      const role = await ctx.service.roles.create({
        name: '单元测试',
      });
      _id = role._id;
    });
    it('should update', async () => {
      await ctx.service.roles.updateOne({ _id }, {
        name: '测试',
      });
      const result = await ctx.service.roles.findOne({ _id });
      assert(result.name === '测试');
    });
    afterEach(async () => {
      mock.restore();
      await ctx.service.roles.deleteOne({ _id });
    });
  });

  describe('destroy', () => {
    let _id;
    beforeEach(async () => {
      const role = await ctx.service.roles.create({
        name: '单元测试',
      });
      _id = role._id;
    });
    it('should destroy', async () => {
      await ctx.service.roles.deleteOne({ _id });
      const result = await ctx.service.roles.findOne({ _id });
      assert(result === null);
    });
    afterEach(async () => {
      mock.restore();
      await ctx.service.roles.deleteOne({ _id });
    });
  });

  describe('list', () => {
    let _id;
    beforeEach(async () => {
      const role = await ctx.service.roles.create({
        name: '单元测试',
      });
      _id = role._id;
    });
    it('should list', async () => {
      const result = await ctx.service.roles.find({
        name: '单元测试',
        desc: '',
      }, {});
      assert(result[0] === 1 && result[1][0].name === '单元测试');
    });
    afterEach(async () => {
      await ctx.service.roles.deleteOne({ _id });
    });
  });

  describe('list all', () => {
    let _id;
    beforeEach(async () => {
      const role = await ctx.service.roles.create({
        name: '单元测试',
        desc: '单元测试',
      });
      _id = role._id;
    });
    it('should list all', async () => {
      const result = await ctx.service.roles.find({
        desc: '单元测试',
      }, {
        pageAll: true,
      });
      assert(result[0] === 1 && result[1][0].name === '单元测试');
    });
    afterEach(async () => {
      await ctx.service.roles.deleteOne({ _id });
    });
  });

  describe('list', () => {
    let _id;
    beforeEach(async () => {
      const role = await ctx.service.test.create({
        name: '单元测试',
      });
      _id = role._id;
    });
    it('should list', async () => {
      const result = await ctx.service.test.find({}, {});
      assert(result[0] === 1 && result[1][0].name === '单元测试');
    });
    afterEach(async () => {
      await ctx.service.test.deleteOne({ _id });
    });
  });

  describe('list all', () => {
    let _id;
    beforeEach(async () => {
      const role = await ctx.service.test.create({
        name: '单元测试',
      });
      _id = role._id;
    });
    it('should list all', async () => {
      const result = await ctx.service.test.find({}, {
        pageAll: true,
      });
      assert(result[0] === 1 && result[1][0].name === '单元测试');
    });
    afterEach(async () => {
      await ctx.service.test.deleteOne({ _id });
    });
  });
});
