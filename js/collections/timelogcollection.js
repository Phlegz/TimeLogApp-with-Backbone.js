    var TimeLogList = Backbone.Collection.extend({
      model: TimeLog,
      localStorage: new Store("backbone-timelog"),  
    });

    