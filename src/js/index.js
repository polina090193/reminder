function getDate () {
    let dateWrap = document.querySelector('.date');
    let timeWrap = document.querySelector('.time')
    let now = new Date();
    
    let currentDay = now.getDate();
    let currentMonth = now.getMonth()
    let currentYear = now.getFullYear();
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();
    let currentSeconds = now.getSeconds();
    
    dateWrap.innerHTML = addZeroIfNeeded(currentDay) + '.';
    dateWrap.append (addZeroIfNeeded(currentMonth + 1) + '.');
    dateWrap.append (addZeroIfNeeded(currentYear));
    timeWrap.innerHTML = addZeroIfNeeded(currentHours) + ':';
    timeWrap.append(addZeroIfNeeded(currentMinutes) + ':');
    timeWrap.append(addZeroIfNeeded(currentSeconds));

    function addZeroIfNeeded(num) {
        return num < 10 ? '0' + num : num;
    }

    setTimeout(getDate)
}
getDate()