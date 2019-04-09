import rollDice from 'js-dice-codes';

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');

const escapeHtml = (text) => {
  // Thank you to https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript/4835406#4835406
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, m =>  map[m]);
}

document.getElementById('input-form').addEventListener('submit', (ev) => {
  ev.preventDefault();

  const dieCode = inputEl.value;
  let result;
  try {
    result = rollDice(dieCode);
  } catch (err) {
    console.error('Failed to parse');
    console.error(err);
    outputEl.innerHTML = (
      `Invalid input ${escapeHtml(inputEl.value)}<br />`
      + outputEl.innerHTML
    );
    return;
  }
  const breakdown = result.breakdown.map(v => v.toString()).join(' + ');

  outputEl.innerHTML = (
    `${dieCode} &rArr; ${result.result} (${breakdown})<br />`
    + outputEl.innerHTML
  );
  inputEl.value = '';
});

inputEl.focus();
