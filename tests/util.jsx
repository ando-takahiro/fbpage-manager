// login integration test using sinon mock
import assert from 'assert';
import getImpressionValue from 'scripts/util/getImpressionValue';
import getPublishIconName from 'scripts/util/getPublishIconName';
import hasPermissions from 'scripts/util/hasPermissions';

describe('util', () => {
  describe('getImpressionValue', () => {
    it('reads impresionValues from post response json', () => {
      assert.equal(
        getImpressionValue({
          insights: {
            data: [
              { name: 'post_impressions', values: [ { value: 123 } ] },
            ],
          },
        }),
        123
      );
    });

    it('returns 0 if broken', () => {
      assert.equal(getImpressionValue(null), 0);
      assert.equal(getImpressionValue('broken'), 0);
      assert.equal(getImpressionValue({ hellow: 'world' }), 0);
    });
  });

  describe('getPublishIconName', () => {
    it('returns icon class name represents publish or not', () => {
      assert.notEqual(
        getPublishIconName(true),
        getPublishIconName(false)
      );
      assert.equal(
        getPublishIconName(true),
        getPublishIconName({})
      );
      assert.equal(
        getPublishIconName(true),
        getPublishIconName('true')
      );
      assert.equal(
        typeof getPublishIconName(true),
        'string'
      );
      assert.equal(
        typeof getPublishIconName(false),
        'string'
      );
      assert.notEqual(
        getPublishIconName(true),
        ''
      );
      assert.notEqual(
        getPublishIconName(false),
        ''
      );
    });

    it('returns 0 if broken', () => {
      assert.equal(getImpressionValue(null), 0);
      assert.equal(getImpressionValue('broken'), 0);
      assert.equal(getImpressionValue({ hellow: 'world' }), 0);
    });
  });

  describe('hasPermissions', () => {
    const response = {
      data: [
        { status: 'granted', permission: 'a' },
        { status: 'granted', permission: 'b' },
        { status: 'granted', permission: 'c' },
        { status: 'broken', permission: 'broken' },
      ]
    };

    it('returns true when response has all expected permissions', () => {
      assert(hasPermissions(response, []));
      assert(hasPermissions(response, ['a']));
      assert(hasPermissions(response, ['a', 'b']));
      assert(hasPermissions(response, ['a', 'b', 'c']));
    });

    it('returns false when response does not have all expected permissions', () => {
      assert(!hasPermissions(response, ['x']));
      assert(!hasPermissions(response, ['a', 'b', 'c', 'd']));
    });

    it('returns false when unexpected input', () => {
      assert(!hasPermissions());
      assert(!hasPermissions(null, ['a', 'b', 'c', 'd']));
      assert(!hasPermissions({broken: 123}, ['a', 'b', 'c', 'd']));
      assert(!hasPermissions({broken: 123}));
    });
  });
});

