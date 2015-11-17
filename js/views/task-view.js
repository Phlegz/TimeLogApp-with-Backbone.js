// renders individual todo items list (li)
    TaskView = Backbone.View.extend({

      tagName: 'li',
      template: _.template($('#item-template').html()),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');    
        return this; // enable chained calls
      },

      initialize: function () {
        this.listenTo(this.model, 'change resetDuration add', this.render, this);
        console.log("hello");
      },

      events: {
        'click .toggle': 'toggleCompleted',
        'dblclick label' : 'edit',
        'click .destroy' : 'delete',
        'click .start' : 'start',
        'click .finish' : 'finish',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close',

      },

      toggleCompleted: function(){
        this.model.toggle();
      },
      edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
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
        
      updateOnEnter: function(e){
        if(e.which == 13){
          this.close();
        }
       },
      close: function(){
        var value = this.input.val().trim();
        if(value) {
          this.model.save({title: value});
        }
        this.$el.removeClass('editing');
      },



    });