class Reminder {
    constructor(title, time) {
        this.title = title;
        this.time = time;
    }
}

class DateContent {
    constructor(date) {
        this.day = date.getDate();
        this.month = date.getMonth() + 1;
        this.year = date.getFullYear();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();

        for (let key in this) {
          this[key] = addZeroIfNecessary(this[key])
      }
    }
  
    get reminderString() {
        return this.day + '.' + 
               this.month + '.' +
               this.year + ' ' + 
               this.hours + ':' + 
               this.minutes;
    }

    get clockString() {
        return this.reminderString + ':'  + this.seconds;
    }
}

function addZeroIfNecessary(num) {
    return num < 10 ? '0' + num : num;
}

function setDate() {
    let clockWrap = document.querySelector('.clock-wrap');

    let now = new Date();

    let current = new DateContent(now);

    function addDate (current) {
        clockWrap.innerHTML = '';
        clockWrap.append(current.clockString);
    }
    
    addDate(current)
    setTimeout(setDate)
}
setDate()

let allReminders = [],
    remindersList = document.querySelector('.reminders-list'),
    noReminders = document.querySelector('.no-reminders');

let submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', setReminder);

function setReminder() {
    let inputTitle = document.querySelector('.reminder-title').value,
        inputDate = document.querySelector('.reminder-date').value,
        inputTime = document.querySelector('.reminder-time').value,

        fullDate = new Date(inputDate + 'T' + inputTime),
        reminder = new Reminder(inputTitle, fullDate.getTime()),

        reminderInfoArr = [],
        
        newReminderContent = new DateContent(fullDate),
        newReminderItem = document.createElement('li');

        newReminderItem.innerHTML = reminder.title + ' ' + newReminderContent.reminderString;
        newReminderItem.className = "reminder-item";
        
        reminderInfoArr.push(reminder.title, reminder.time, newReminderContent.reminderString, newReminderItem);
        allReminders.push(reminderInfoArr);
        
        
        function addReminderToList(reminder) {
            remindersList.append(newReminderItem);
            noReminders.style.display = "none";
        }
        
        addReminderToList(reminder);
        addX(newReminderItem);

        runReminder(allReminders);
}

function runReminder(allReminders) {
    
    for (let i = 0; i < allReminders.length; i++) {
        
        if (Date.now() >= allReminders[i][1]) {
            let sound = new Audio('audio/bell.mp3');
            sound.play();

            let reminderMessageField = document.querySelector('.reminder-message'),
                reminderMessageText = document.createElement('p');
                reminderMessageText.innerHTML = allReminders[i][0] + '<br>' + allReminders[i][2];

            addX(reminderMessageText);

            reminderMessageField.append(reminderMessageText);

            let reminderItems = remindersList.querySelectorAll(".reminder-item"),
                reminderItemToRemove = reminderItems[i];

            reminderItemToRemove.remove();
            
            allReminders.splice([i], 1);

            checkAllRemindersIsEmpty()
        }
        
    }
    setTimeout(runReminder, 1000, allReminders)
}

function addX(item) {
    let x = document.createElement('span');
    x.innerHTML = ' X';
    
    x.addEventListener('click', () => {
        if(item.parentNode === remindersList) {
            let itemIndex = Array.from(remindersList.childNodes).indexOf(item);
            allReminders.splice(itemIndex - 1, 1);
        }

        item.remove();

        checkAllRemindersIsEmpty()
    });

    item.append(x);
}

function checkAllRemindersIsEmpty() {
    if (allReminders.length === 0) {
        noReminders.style.display = "inline";
        return
    } 
}