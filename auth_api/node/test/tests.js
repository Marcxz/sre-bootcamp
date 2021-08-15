import chai from 'chai';
import { loginFunction } from '../services/login'
import { protectFunction } from '../services/protected'

const expect = chai.expect;
describe('loginFunction()', async function () {
  it('Test login With admin Credentials', async function () {

    expect(true).to.be.equal(await (await loginFunction("admin", "secret")).valid);
  });
});

describe('loginFunction()', async function () {
  it('Test login With noadmin Credentials', async function () {

    expect(true).to.be.equal(await (await loginFunction("noadmin", "noPow3r")).valid);
  });
});

describe('loginFunction()', async function () {
  it('Test login With bob Credentials', async function () {

    expect(true).to.be.equal(await (await loginFunction("bob", "thisIsNotAPasswordBob")).valid);
  });
});

describe('loginFunction()', async function () {
  it('Test login With BAD Credentials', async function () {

    expect(false).to.be.equal(await (await loginFunction("miguel", "itisntpass")).valid);
  });
});

describe('protectFunction()', function () {
  it('Test protected', function () {

    expect("You are under protected data").to.be.equal(protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI"));
  });
});
