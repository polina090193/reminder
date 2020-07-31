+function getDate () {
    let start = Date.now();
    let dayWrap = document.querySelector('.day');
    let monthWrap = document.querySelector('.month');
    let yearWrap = document.querySelector('.year');
    let time = document.querySelector('.time')
    /* let hoursWrap = document.querySelector('.hours');
    let minutesWrap = document.querySelector('.minutes');
    let secondsWrap = document.querySelector('.seconds'); */
    let now = new Date();
    
    let currentDay = now.getDate();
    let currentMonth = now.getMonth()
    let currentYear = now.getFullYear();
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();
    let currentSeconds = now.getSeconds();
    
    dayWrap.innerHTML = addZeroIfNeeded(currentDay) + '.';
    monthWrap.innerHTML = addZeroIfNeeded(currentMonth + 1) + '.';
    yearWrap.innerHTML = addZeroIfNeeded(currentYear);
    time.innerHTML = addZeroIfNeeded(currentHours) + ':';
    time.append(addZeroIfNeeded(currentMinutes) + ':');
    time.append(addZeroIfNeeded(currentSeconds));

    function addZeroIfNeeded(num) {
        return num < 10 ? '0' + num : num;
    }
    
    let end = Date.now();
    let elapsed = end - start;
    return elapsed
}

setInterval(getDate, 1000 - getDate())
// getDate()