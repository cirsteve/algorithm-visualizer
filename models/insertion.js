(function (Backbone, $, _) {
    var __super__ = Backbone.Model.prototype;

    DVZ.InsertionModel = Backbone.Model.extend({
        
        initialize: function (options) {
            __super__.initialize.call(this, arguments);
            this.set({
                    indexCheck: 1,
                    indexTotal: 1,
                    collection: options.collection,
                    length: options.collection.length
            });

        },

        breakCheck: function () {
            //this is called when the current index is larger then the next left value and should be inserted
            var incIndex = this.get('indexTotal');

            incIndex++;

            if (incIndex === this.get('length')) {
                this.rModel.deactivate();
                this.lModel.deactivate();
                this.trigger('redraw');
                this.trigger('completed');
                return;
            } else {
                this.rModel.deactivate();
                this.lModel.deactivate();
                this.set({
                    indexCheck:incIndex,
                    indexTotal:incIndex
                });
                console.log('cont ', this.get('collection').models);
                this.checkValues();
            }
            
        },

        checkValues: function () {
            var col = this.get('collection'),
                rIndex = this.get('indexCheck');
            this.rModel = col.at(rIndex).setActive();
            this.lModel = col.at(rIndex - 1).setActive();


            this.trigger('redraw');
            setTimeout(_.bind(this.compareValues, this), 1000);
        },

        compareValues: function () {
            var rValue = this.rModel.get('dataPoint'),
                lValue = this.lModel.get('dataPoint');

            if (this.comparator(lValue, rValue)) {
                this.switchValues();
            } else {
                this.breakCheck();
            }
        },

        comparator: function (a, b) {
            //return true if b is greater a an switch should happen
            return a - b > 0 ? true : false;
        },

        switchValues: function () {
            var col = this.get('collection'),
                rIndex = this.get('indexCheck'),
                holder = this.rModel;

            col.models[rIndex] = this.lModel.deactivate();
            col.models[rIndex - 1] = holder.deactivate();
            this.trigger('redraw');
            this.set('indexCheck',--rIndex);
            if (this.get('indexCheck') === 0) {
                setTimeout(_.bind(this.breakCheck, this), 1000);
            } else {
                setTimeout(_.bind(this.checkValues, this), 1000);
            }
        },

        sort: function () {
            this.checkValues();
        }
        
    });
}(window.Backbone, window.jQuery, window._));
