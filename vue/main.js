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

    reminders = remindersStorage.fetch(),

    newReminder: {
      title: '',
      date: '',
      time: '',
    } 

  },

  computed: {
    /* listItem() {
      return this.title + " " + this.date + " " + this.time;
    }, */
  },

  methods: {

    addReminder() {

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
