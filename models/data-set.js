(function (Backbone, $, _, undefined) {
    DVZ.DataSet = Backbone.Model.extend({

        defaults: {
            min: 0,
            max: 100,
            length: 10
        },

        initialize: function () {
            this.createSet();
            //new DVZ.DataSetView({model:this});
        },

        getRange: function () {
            return this.get('max') - this.get('min');
        },

        createSet: function () {
            var len = this.get("length"),
                range = this.getRange(), 
                i = 0, collection;

            this.set('collection', new DVZ.DataPoints());
            collection = this.get('collection');

            while (i<len) {
            collection.add({id:i})
            i++;
            }

            return this;
        }

    });
}(window.Backbone, window.jQuery, window._));
