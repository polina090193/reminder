function setDate () {
    let dateWrap = document.querySelector('.date');
    let timeWrap = document.querySelector('.time')
    let now = new Date();

    let current = {
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
    }

    for (let key in current) {
        current[key] = addZeroIfNecessary(current[key])
    }

    function addZeroIfNecessary(num) {
        return num < 10 ? '0' + num : num;
    }

    function addDate (current) {
        dateWrap.innerHTML = current.day + '.';
        dateWrap.append(current.month + '.');
        dateWrap.append(current.year);

        timeWrap.innerHTML = current.hours + ':';
        timeWrap.append(current.minutes + ':');
        timeWrap.append(current.seconds);
    }
    
    addDate(current)

    setTimeout(setDate)
}
setDate()

class Reminder {
    constructor(title, time) {
        this.title = title;
        this.time = time;
    }

    
}

function setReminder () {
    let reminder = new Reminder('Feed the cat', Date.now() + 10000)
    console.log(reminder.time)
    return reminder
}

function playReminder (reminder) {
    console.log(reminder.time)

    let sound = new Audio('../audio/bell.mp3');
    if (Date.now() === reminder.time) sound.play();
    setTimeout(playReminder)
}
playReminder(setReminder())