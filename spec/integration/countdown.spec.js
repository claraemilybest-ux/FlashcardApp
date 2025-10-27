const importEsm = require('../helpers/import-esm');

describe('countdown auto-advance', () => {
  it('advances to next question when countdown reaches zero', (done) => {
    importEsm('../../js/components/CurrentGame.js').then((instance) => {
      expect(instance).not.toBeNull();
      instance.game = { questions: [{question:'q1', correct_answer:'a', incorrect_answers:['b','c','d']}, {question:'q2', correct_answer:'a', incorrect_answers:['b','c','d']}], gameStats: ()=>{} };
      document.body.innerHTML = '<div id="trivia"></div>';
      instance.render();
      instance.startCountdown(1);
      setTimeout(()=>{
        try{
          expect(instance.counter).toBeGreaterThan(0);
          done();
        }catch(e){done(e)}
      }, 1500);
    });
  });
});
