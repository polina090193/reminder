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

let sound = new Audio('../audio/bell.mp3');

let submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', function () {
    let inputTitle = document.querySelector('.reminder-title').value,
        inputDate = document.querySelector('.reminder-date').value,
        inputTime = document.querySelector('.reminder-time').value;

    console.log(inputDate);
    console.log(inputTime);

    let transformDate = new Date(inputDate + 'T' + inputTime);

    let reminder = new Reminder(inputTitle, transformDate.getTime())
    
    function runReminder(reminder) {

        let reminderTime = reminder.time;
        let reminderTitle = reminder.title;
        
        function checkTime() {
            if (Date.now() > reminderTime) {
                sound.play()
                alert(reminderTitle)
                return
            }
            setTimeout(checkTime, 1000)
        }
        checkTime()
    }

    runReminder(reminder)
})



