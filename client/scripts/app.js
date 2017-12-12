var Movie = Backbone.Model.extend({
  defaults: {
    like: true
  },

  toggleLike: function() {
    this.get('like') ? this.set('like', false) : this.set('like', true);
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
  },

  comparator: 'title',

  sortByField: function(field) {
    this.comparator = field;
    this.sort();
    // _.sortBy(this.comparator, field);
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    this.model.on('change', function() {
      this.render();
    }, this); // Why the binding of this (optional third parameter) is necessary here?
  },

  events: {
    //events are automatically added to be listened to
    //event          //callback
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    // add event listener for click
    this.on('change: click button', function() {
    // access the model, call toggle function
      this.model.toggleLike();
    });
    
    
    //this.model.toggleLike();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
