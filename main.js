// function 

const STORAGE_KEY = "reminders";

let remindersStorage = {

  fetch: function() {
    let reminders = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    reminders.forEach(function(reminder, index) {
      reminder.id = index;
    });

    remindersStorage.uid = reminders.length;
    return reminders;
  },

  save: function(reminders) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  }

};

window.addEventListener('storage', event => {
  reminder.reminders = remindersStorage.fetch();
})

let reminder = new Vue({

  el: '#app',

  data: {

    reminders: remindersStorage.fetch(),

    newReminder: {
      title: '',
      date: '',
      time: '',
      timeMs: '',
    } 

  },

  watch: {
    reminders: {
      handler: function(reminders) {
        remindersStorage.save(reminders);
      },
      deep: true
    }
  },

  computed: {
    inputClass() {
      if (!this.setIsActive) return 'warning';
    },

    calledReminders() {
      return this.reminders.filter(reminder => reminder.called)
    },

    setIsActive() {
      return this.newReminder.title && this.newReminder.date && this.newReminder.time;
    }
  },

  methods: {

    getReminderText(item) {
      
      if (!item.timeMs) {
        return item.timeMs || item;
      }

      let dateObj = new Date(item.timeMs);
        
        let dd = dateObj.getDate();
        if (dd < 10) dd = '0' + dd;
      
        let mm = dateObj.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        let yy = dateObj.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
      
        let hh = dateObj.getHours();
        if (hh < 10) hh = '0' + hh;
      
        let min = dateObj.getMinutes();
        if (min < 10) min = '0' + min;
        
        return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min + ' - ' + item.title;
      
    },

    addReminder() {
      let value = this.newReminder;
      if (!value || !this.setIsActive) {
        return;
      }

      this.reminders.push({
        id: remindersStorage.uid++,
        title: value.title,
        date: value.date,
        time: value.time,
        timeMs: Date.parse(value.date + ' ' + value.time),
        called: false,
      })

      this.newReminder = {
        title: '',
        date: '',
        time: '',
      };
    },

    removeReminder(item) {
      this.reminders.splice(this.reminders.indexOf(item), 1)
    },
    
    editReminder(item) {

    },

    doneEdit(item) {

    },

    cancelEdit(item) {

    },

    snoozeReminder(item) {
      let newMs = Date.now() + 240000;

      item.timeMs = newMs;
      item.called = false;
    },

  }

})

function checkTime() {

  for(let item of reminder.reminders) {
    if (Date.now() >= item.timeMs && !item.called) {

      let sound = new Audio('bell.mp3');
          sound.play();

      item.called = true;
    }
  }
  
  setTimeout(checkTime, 1000)
}

checkTime();