(function (Backbone, $, _, undefined) {
    DVZ.DataPointsView = Backbone.View.extend({
        tagName: 'ul',
        className: 'data-points',

        initialize: function (options) {
            this.render();
            return this;

        },

        render: function() {
            var $el = this.$el;
            _.each(this.collection.models, function(d) {
                var point = new DVZ.DataPointView({model:d});
                $el.append(point.el);
            });
        }
    });

}(window.Backbone, window.jQuery, window._));
