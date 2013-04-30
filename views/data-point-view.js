(function (Backbone, $, _, undefined) {
    DVZ.DataPointView = Backbone.View.extend({
        tagName: 'li',
        initialize: function (options) {
            this.options.model.on('setActive', this.setActive);
            this.options.model.on('deacctivate', this.deactivate);
            this.render();
            
            return this;

        },

        render: function() {
            this.$el.css('height', this.options.model.get('dataPoint') + 'px');
        },

        deactivate: function () {
            this.$el.removeClass("active");
        },

        setActive: function () {
            this.$el.addClass("active");
        }
    });

}(window.Backbone, window.jQuery, window._));
