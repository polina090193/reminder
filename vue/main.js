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

    newReminder: ''/* {
      title: '',
      date: '',
      time: '',
    }  */

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
        title: value
      })

      console.log(this.reminders);

      this.newReminder = '';
    },

    removeReminder(reminder) {

    },
    
    editReminder(reminder) {

    },

    doneEdit: function(reminder) {

      if (!this.editedReminder) {
        return;
      }

      this.editedReminder = null;
      reminder.title = reminder.title.trim();

      if (!reminder.title) {
        this.removeTodo(reminder);
      }

    },

    cancelEdit: function(reminder) {
      this.editedReminder = null;
      reminder.title = this.beforeEditCache;
    },
    
    callReminder(reminder) {
      this.removeReminder(reminder);
    }

  }

})
