import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Stopwatch</h1>
<div id='stopwatch'>
  <button id='start'>Start</button>
  <button id='stop'>Stop</button>
  <button id='reset'>Reset</button>
  <p id='total'>0</p>
</div>
`;

function createTimer(el) {
  let counter = 0;
  let interval;

  function getCounter() {
    return counter / 100;
  }

  function dispatchCount() {
    el.dispatchEvent(new CustomEvent('countChanged', { bubbles: true, detail: getCounter() }));
  }

  function start() {
    if (interval) {
      return;
    }
    interval = setInterval(() => {
      counter++;
      dispatchCount();
    }, 10);
  }

  function stop() {
    clearInterval(interval);
    interval = null;
  }

  function reset() {
    counter = 0;
    dispatchCount();
    if (interval) {
      stop();
      start();
    }
  }

  return {
    start,
    stop,
    reset,
    getCounter
  };
}

let timer = createTimer(document.getElementById('stopwatch'));

document.getElementById('start').addEventListener('click', timer.start);
document.getElementById('stop').addEventListener('click', timer.stop);
document.getElementById('reset').addEventListener('click', timer.reset);

let totalElement = document.getElementById('total');

document.getElementById('stopwatch').addEventListener('countChanged', (e) => totalElement.innerHTML = e.detail)
