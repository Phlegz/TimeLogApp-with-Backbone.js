        // The collection of Task is backed by *localStorage* instead of a remote
    // server. $(function(){
    var TaskList = Backbone.Collection.extend({
      model: Task,
      localStorage: new Store("backbone-timelog"),

    })

     taskList = new TaskList();
