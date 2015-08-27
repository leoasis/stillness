import expect from 'expect';
import { hasIn, getIn, setIn, updateIn, mergeIn } from '../src/index';

describe('stillness', () => {
  describe('hasIn', () => {
    it('works', () => {
      expect(hasIn({foo: 1}, ['foo'])).toEqual(true);
      expect(hasIn({foo: 1}, ['bar'])).toEqual(false);

      expect(hasIn({foo: {bar: 1}}, ['foo', 'bar'])).toEqual(true);
      expect(hasIn({foo: {bar: 1}}, ['foo', 'bax'])).toEqual(false);

      expect(hasIn({foo: [0, 1, 2]}, ['foo', 1])).toEqual(true);
      expect(hasIn({foo: [0, 1, 2]}, ['foo', 3])).toEqual(false);
    });
  });

  describe('getIn', () => {
    it('works', () => {
      expect(getIn({foo: 1}, ['foo'])).toEqual(1);
      expect(getIn({foo: 1}, ['bar'])).toEqual(undefined);

      expect(getIn({foo: {bar: 1}}, ['foo', 'bar'])).toEqual(1);
      expect(getIn({foo: {bar: 1}}, ['foo', 'bax'])).toEqual(undefined);

      expect(getIn({foo: [0, 1, 2]}, ['foo', 1])).toEqual(1);
      expect(getIn({foo: [0, 1, 2]}, ['foo', 3])).toEqual(undefined);
    });
  });

  describe('setIn', () => {
    it('works', () => {
      expect(setIn({foo: 1}, ['foo'], 2)).toEqual({foo: 2});
      expect(setIn({foo: 1}, ['bar'], 2)).toEqual({foo: 1, bar: 2});
      expect(() => {
        setIn({foo: 1}, ['foo', 'bar'], 2);
      }).toThrow();
    });
  });

  describe('updateIn', () => {
    it('works', () => {
      expect(updateIn({foo: 2}, ['foo'], val => val * 2)).toEqual({foo: 4});
      expect(updateIn({foo: {bar: 2}}, ['foo', 'bar'], val => val * 2)).toEqual({foo: {bar: 4}});
      expect(updateIn(
        { foo: [{ bar: [1, 2, 3] }] },
        ['foo', 0, 'bar', 2],
        val => val * 2
      )).toEqual({ foo: [{ bar: [1, 2, 6] }] });
    });
  });

  describe('mergeIn', () => {
    it('works', () => {
      expect(mergeIn({foo: {bar: 1, baz: 2}}, ['foo'], {bax: 3})).toEqual({foo: {bar: 1, baz: 2, bax: 3}});
      expect(mergeIn( {foo: [1, 2, 3]}, ['foo'], [4, 5, 6])).toEqual({foo: [1, 2, 3, 4, 5, 6]});
    });
  });
});
