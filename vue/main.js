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
    
    reminderItem() {
      if (this.newReminder.date && this.newReminder.time) {

        let dateObj = new Date(this.newReminder.date + 'T' + this.newReminder.time);
  
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
  
        return this.newReminder.title + ' ' + dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min;

      }
    },

  },

  methods: {

    addReminder() {
      let value = this.newReminder /* && this.newReminder.trim() */;
      if (!value) {
        return;
      }

      this.reminders.push({
        id: remindersStorage.uid++,
        title: value.title,
        date: value.date,
        time: value.time,
        timeMs: Date.parse(value.date + ' ' + value.time),
      })

      this.newReminder = {
        title: '',
        date: '',
        time: '',
        timeMs: '',
      };
    },

    removeReminder(reminder) {
      this.reminders.splice(this.reminders.indexOf(reminder), 1)
    },
    
    editReminder(reminder) {

    },

    doneEdit: function(reminder) {

    },

    cancelEdit: function(reminder) {

    },
    
    callReminder(reminder) {
      
      this.removeReminder(reminder);
    },

    snoozeReminder(reminder) {

    },

  }

})

function checkTime() {

  for(let item of reminder.reminders) {
    if (Date.now() >= item.timeMs) {
      document.querySelector('.reminders-list-wrap').append(item.title);
      reminder.removeReminder(item);
    }
  }
  
  setTimeout(checkTime, 8000)
}

checkTime();

window.addEventListener('storage', event => {
  reminder.reminders = remindersStorage.fetch();
})