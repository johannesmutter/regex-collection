const query = 'example';
const text = 'Hello World. This is a sentence. Here’s another sentence with e.g. example query and B.Y.O.B and a number that is i.e. 10.000€, yay!';

const matchesQuery = new RegExp('('+query+')',"gi");

// Let’s construct our Regex:
const sentenceFragments = [
  '\\b(?:[a-z]\\.){2,}', // match: e.g. i.e.
  '\\b(?:[a-z]*[bcdfghjklmnpqrstvwxysß]{3,}\\.)', // match: cambr. techn.
  '\\b(?:[a-z][bcdfghjklmnpqrstvwxysß]{2,}\\.)', // match: add. adj. acc. opp.
  '\\b(?:[bcdfghjklmnpqrstvwxysß]+\\.)', // match: str. mr.
  '\\b(?:\\d*\\.\\d+)', // match 10.000
  '[^\\.\\?\\!]', // not .!?
];
const allowed = '(?:'+ sentenceFragments.join('|') + ')*';
const regex = new RegExp(
  '('+allowed+'('+query+')'+allowed+')','i'
);

if(regex.test(text)){
  // 1. match sentence
  const sentence = text.match(regex)[1];
  // 2. replace matched search query with emphasis of search query
  const emphasis = sentence.replace(matchesQuery, '<em>$1</em>');
  console.log(emphasis);
}
