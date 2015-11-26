// renders individual todo items list (li)
    TaskView = Backbone.View.extend({

      tagName: 'li',
      // Cache the template function for a single item.
      template: _.template($('#item-template').html()),
      
      // The DOM events specific to an item.
      events: {
        'click .toggle': 'toggleCompleted',
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close',
        'click .destroy' : 'delete',
        'click .start' : 'start',
        'click .finish' : 'finish',
      },

      // The Task-View listens for (changes,resetDuration, add) to its model, re-rendering. Since
      // there's a one-to-one correspondence between the taskmodel and the
      // taskview in this app, we set a direct reference on the model for
      // convenience.

      initialize: function () {
        this.listenTo(this.model, 'change resetDuration add', this.render);
        console.log("hello");
      },


      // Re-render the titles of the todo item.
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');    
        return this; // enable chained calls
      },

      toggleCompleted: function(){
        this.model.toggle();
      },

      // Switch this view into `"editing"` mode, displaying the input field.
      edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
      },

      updateOnEnter: function(e){
        if(e.which == 13){
          this.close();
        }
       },

      // Close the `"editing"` mode, saving changes to the todo.
      close: function(){
        var value = this.input.val().trim();
        if(value) {
          this.model.save({title: value});
        }
        this.$el.removeClass('editing');
      },

      delete: function(){
        this.$el.addClass('deletion');
        this.model.destroy();
      },

      start: function(){
        this.model.startTime();
        this.$el.addClass("startOn"); //do not put it in the model
      },

      finish: function(){
        this.model.finishTime();
        this.$el.removeClass("startOn"); //do not put it in the model
      },

    });
