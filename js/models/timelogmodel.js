    var TimeLog = Backbone.Model.extend({
      defaults: {
        start: 0,
        finish: 0,
        duration: 0,
      },

      initialize: function () {
      	this.on('change:finish', this.checkInterval)
      	this.checkInterval()
      },

      checkInterval: function () {
      	if (!this.get('finish')) {
      		this.interval = setInterval(this.tick.bind(this), 1000)
      	} else {
      		clearInterval(this.interval)
      	}
      },

      tick: function () {
      	var duration = this.get('duration')
      	this.set({duration: duration + 1})
      }

    });

    