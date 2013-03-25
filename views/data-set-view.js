(function (Backbone, $, _, undefined) {
    DVZ.DataSetView = Backbone.View.extend({
        template: $('#data-set'),
        
        events: function () {
            return {
                    'click .reset': 'reset',
                    'click .merge': 'merge',
                    'click .insertion': 'insertion'
            };
        },

        initialize: function (options) {
            this.render();
            this.bin

        },

        render: function() {
            this.$el.html(this.template.html());
            this.renderDataPoints();
            $('#content').append(this.el);

        },

        renderDataPoints: function () {
            var collectionHTML = new DVZ.DataPointsView({collection:this.model.get('collection')});
            this.$el.find('.data-target').html(collectionHTML.el);

        },

        reset: function () {
            this.model.createSet();
            this.renderDataPoints();
        },

        insertion: function () {
            this.model.get('collection').insertionSort();
            this.renderDataPoints();
        },

        merge: function () {
            this.model.get('collection').mergeSort();
            this.renderDataPoints();
        }

    });

}(window.Backbone, window.jQuery, window._));
