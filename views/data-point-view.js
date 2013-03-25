(function (Backbone, $, _, undefined) {
    DVZ.DataPointView = Backbone.View.extend({
        tagName: 'li',
        initialize: function (options) {
            this.render();
            return this;

        },

        render: function() {
            this.$el.css('height', this.options.model.get('dataPoint') + 'px');
        }
    });

}(window.Backbone, window.jQuery, window._));
