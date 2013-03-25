(function (Backbone, $, _, undefined) {

    DVZ.DataPoints = Backbone.Collection.extend({
        model: DVZ.DataPoint,

        insertionComparator: function (a, b) {
            //return true if b is greater a an switch should happen
            return b - a > 0 ? true : false;
        },

        insertionSort: function () {
            var list = this.models,
                len = list.length, 
                i = 1, h;
            
            while (i<len) {
                var t = i;
                while(t > 0) {
                    if (this.insertionComparator(list[t].get('dataPoint'), list[t-1].get('dataPoint'))) {
                        h = list[t];
                        list[t] = list[t-1];
                        list[t-1] = h;
                        t--;
                    } else {
                        break;
                    }
                }
                i++;
            }

            return this.models;
        },

        mergeSortLists: function (left, right) {
            var result = [];
            console.log(left, right);

            while (left.length && right.length){
                if (left[0] >= right[0]){
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }

            while (left.length)
                result.push(left.shift());

            while (right.length)
                result.push(right.shift());

            return result;
        },

        getBinaryLists: function (list) {
            var half = Math.ceil(list.length/2);
            
            if (list.length < 2) {
                return list;
            } else {
                return this.mergeSortLists(
                    this.getBinaryLists(list.slice(0, half)),
                    this.getBinaryLists(list.slice(half))
                );
            }
        },

        mergeSort: function () {
            var list = this.models,
                len = list.length,
                binLists = this.getBinaryLists(list);

            console.log(binLists,',', this.models);
            this.models = _.clone(binLists);
            return binLists;
            
            
            
        }

    });

}(window.Backbone, window.jQuery, window._));
