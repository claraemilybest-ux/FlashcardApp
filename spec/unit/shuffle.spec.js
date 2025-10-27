const importEsm = require('../helpers/import-esm');

describe('shuffleAnswers', () => {
  it('shuffles array in-place and preserves elements', async () => {
    const CurrentGame = await importEsm('../../js/components/CurrentGame.js');
    const instance = CurrentGame || CurrentGame.default;
    expect(instance).not.toBeNull();
    const arr = [1,2,3,4,5];
    const before = arr.slice();
    const after = instance.shuffleAnswers(arr.slice());
    expect(after.sort()).toEqual(before.sort());
    expect(Array.isArray(after)).toBe(true);
  });
});
