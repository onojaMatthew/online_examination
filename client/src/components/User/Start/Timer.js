  let timeoutHandle;

  function countdown(minutes, seconds) {
    let seconds = 60;
    let mins = minutes

    function tick() {
      let counter = document.getElementById("timer");
      let current_minutes = mins - 1
      seconds--;
      counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
      if (seconds > 0) {
        timeoutHandle = setTimeout(tick, 1000);
      } else {

        if (mins > 1) {

          setTimeout(function() {
            countdown(mins - 1);
          }, 1000);

        }
      }
    }
    tick();
  }

  countdown(2);