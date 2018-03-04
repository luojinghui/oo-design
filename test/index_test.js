/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 2018/3/5
 * Time: 上午1:33
 */
var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});