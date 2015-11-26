   // renders the full list of task items 

    TasksView = Backbone.View.extend({
      el: "#timelogapp",
      initialize: function () {
        this.input = this.$('#new-task');
        taskList.on('add', this.addOne, this);
        taskList.on('reset', this.addAll, this);
        taskList.fetch(); // Loads list from local storage
        //alert("Rendering the full list");
      },    

      events: {
        'keypress #new-task': 'createTaskOnEnter'
      },
      createTaskOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
          return;
        }
        taskList.create(this.newAttributes());
        this.input.val(''); // clean input box
      },

      addAll: function(){
      this.$('#task-list').html(''); // clean the task list
      taskList.each(this.addOne, this);
      },

      addOne: function(task){
        var view = new TaskView({model: task});
        $('#task-list').append(view.render().el);
      },

      newAttributes: function(){
        return {
          title: this.input.val().trim(),
          completed: false,
          total_time: 0
        }
      }

    });

    AppView = new TasksView();
