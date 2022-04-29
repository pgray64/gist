const millisecondsInDay = 8.64e7
const weeklyHotRankingDecayRate = Math.LN2 * 1 / millisecondsInDay;
module.exports = {


  friendlyName: 'Get hot score',


  description: '',
  sync: true,

  inputs: {
    currentScore: {
      type: 'number',
      required: true,
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Hot score computed',
    },

  },


  fn: function ({currentScore}) {
    let nowMs = Date.now();
    let u = Math.max(currentScore, weeklyHotRankingDecayRate * nowMs)
    let v = Math.min(currentScore, weeklyHotRankingDecayRate * nowMs)
    return u + Math.log1p(Math.exp(v-u));
  }


};

