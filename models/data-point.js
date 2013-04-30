(function (Backbone, $, _, undefined) {
    DVZ.DataPoint = Backbone.Model.extend({
        defaults: {
            dataPoint: 0,
            min: 0,
            max: 100,
            active: false
        },

        initialize: function () {
            this.set('dataPoint', this.randomizeSelf());
        },
    
        deactivate: function () {
            this.set('active', false);
            return this;
        },
    
        getRange: function () {
            return this.get('max') - this.get('min');
        },

        randomizeSelf: function () {
            return Math.floor(Math.random() * this.getRange() + 1);
        },

        setActive: function () {
            this.set('active', true);
            return this;
        }
    });

}(window.Backbone, window.jQuery, window._));
