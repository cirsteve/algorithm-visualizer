(function (Backbone, $, _, undefined) {
    DVZ.DataPoint = Backbone.Model.extend({
        defaults: {
            dataPoint: 0,
            min: 0,
            max: 100
        },
        initialize: function () {
            this.set('dataPoint', this.randomizeSelf());
        },
    
        getRange: function () {
            return this.get('max') - this.get('min');
        },

        randomizeSelf: function () {
            return Math.floor(Math.random() * this.getRange() + 1);
        }
    });

}(window.Backbone, window.jQuery, window._));
