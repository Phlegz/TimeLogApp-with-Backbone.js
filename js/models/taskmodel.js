
  Task = Backbone.Model.extend({
        defaults: {
        title:'',
        completed:false,
        total_time: 0,
        timelogs: []  /*Added an array to save the timelogs*/
        },

        initialize: function() {
          this.timelogs = new TimeLogList(this.get('timelogs'));
          this.listenTo(this.timelogs, "change add",this.resetDuration)
        },

        resetDuration: function () {
          this.save({timelogs: this.timelogs.toJSON()}, {silent: true})  /*Added this line to save the timelogs.added silent to prevent render*/
          this.trigger('resetDuration')
        },
        toJSON: function () {
          var json = Backbone.Model.prototype.toJSON.apply(this, arguments)
          json.timelogs = this.timelogs.toJSON()
          if (this.activeTimelog) {
            json.active = this.activeTimelog.toJSON()
          } else {
            json.active = false
          }
          json.total_time = _.reduce(this.timelogs.pluck('duration'), function (a,b) {return a + b}, 0)
          return json
        },

        startTime: function(){
          var starttime = new Date;
          this.activeTimelog = this.timelogs.add({start: starttime}) /*changed "create" to "add". We add the start attribute everytime we click on start*/
        },

        finishTime: function(){
          var finishtime = new Date;
          var timelog = this.activeTimelog
          delete this.activeTimelog
          timelog.set({finish : finishtime})
        },
        
        toggle: function () {
          this.save({
            completed: !this.get('completed')
          });
        }

    });

