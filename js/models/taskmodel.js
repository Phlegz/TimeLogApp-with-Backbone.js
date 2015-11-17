Task = Backbone.Model.extend({
      initialize: function() {
        this.timelogs = new TimeLogList();
        this.listenTo(this.timelogs, "change add", this.resetDuration)
      },

      resetDuration: function () {
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
        this.activeTimelog = this.timelogs.create({start: starttime})
      },

      finishTime: function(){
        var finishtime = new Date;
        var timelog = this.activeTimelog
        delete this.activeTimelog
        timelog.save({finish : finishtime})
      },

      defaults: {
        title:'',
        completed:false,
        total_time: 0
      },

      toggle: function () {
        this.save({
          completed: !this.get('completed')
        });
      }

    });

