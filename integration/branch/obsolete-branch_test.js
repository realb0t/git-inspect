const { expect }  = require('chai');
const sinon = require('sinon');
const map = require('lodash/map');
const keyBy = require('lodash/keyBy');
const { inspect, clearGarden, SchemaValidator } = require('../helpers');

describe('[Integration] Inspect branches is obsolete', () =>
{
  const caseName = 'obsolete-branch';
  let inspector = null;

  beforeEach(async () => { inspector = await inspect(caseName); });
  afterEach(async () => await clearGarden(caseName));

  it('Should be supported by JSON Schema for this case', async () =>
  {
    const report = await inspector.collect();
    const result = report.getInstance();
    const validator = new SchemaValidator();
    const valid = validator.validate(result);
    expect(valid).to.equal(true, JSON.stringify(validator.errors));
  });

  it('Should be exist one obsolete branch', async () =>
  {
    const report = await inspector.collect();
    const { branch: { obsolete } } = report.getMappedResults();
    expect(Object.keys(keyBy(obsolete.branches, 'name'))).to.deep.equal(['obsolete-branch']);
  });
});
