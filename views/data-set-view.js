(function (Backbone, $, _, undefined) {
    DVZ.DataSetView = Backbone.View.extend({
        template: MNKY.TMPL.algoviz_dataset,
        
        events: function () {
            return {
                    'click .reset': 'reset',
                    'click .merge': 'merge',
                    'click .insertion': 'insertion'
            };
        },

        initialize: function (options) {
            this.dataArray = this.options.model.get("collection");
            this.prepareDefaults(options);
            this.render();
        },

        render: function() {
            this.$el.html(this.template({}));
            $('#dvz-target').append(this.el);
            this.renderDataPointsD3();

        },

        prepareDefaults: function (options) {
            console.log('prep d');
            this.blockW = 20;
            this.blockH = 120;
            this.svgHeight = 300;
            this.xSc = d3.scale.linear()
                    .domain([0,1])
                    .range([0,this.blockW]);
            this.ySc = d3.scale.linear()
                    .domain([0,100])
                    .range([0,this.blockH]);
            this.svg = d3.select("#d3-target").append("svg")
                    .attr("class","sortees")
                    .attr( "width", (this.dataArray.length) * this.blockW)
                    .attr("height", this.svgHeight);
        },

        renderDataPoints: function () {
            console.log('rend');
            var collectionHTML = new DVZ.DataPointsView({collection:this.model.get('collection')});
            this.$el.find('.data-target').html(collectionHTML.el);

        },

        renderDataPointsD3: function () {
            console.log('rend3', this.dataArray);
            var localFuncs = _.extend({}, this)
            this.svg.selectAll("rect")
                .data(this.dataArray.toJSON(), function (d) { return d.id;})
                .enter().append("rect")
                    .attr("x", function(d,i) {return localFuncs.xSc(i) - .5;})
                    .attr("y", function(d) {return 150 + localFuncs.blockH - localFuncs.ySc(d.dataPoint) - .5;})
                    .attr("width", localFuncs.blockW)
                    .attr("height", function(d) {return localFuncs.ySc(d.dataPoint);});
            this.svg.selectAll("rect")
                .data(this.dataArray.toJSON(), function (d) { return d.id;})
                .transition().duration(1000)
                    .attr("x", function(d,i) {return localFuncs.xSc(i) - .5;})
                    .attr("y", function(d) {return d.active ? localFuncs.blockH - localFuncs.ySc(d.dataPoint) - .5 : 150 + localFuncs.blockH - localFuncs.ySc(d.dataPoint) - .5;})
                    .attr("class", function(d) {return d.active ? "active" : "";});
        },

        reset: function () {
            this.model.createSet();
            this.renderDataPointsD3();
        },

        insertion: function () {
            var insModel = new DVZ.InsertionModel({collection:this.model.get('collection')});
            insModel.on("redraw", this.renderDataPointsD3, this);
            insModel.sort();
        },
    
        merge: function () {
            this.model.get('collection').mergeSort();
            this.renderDataPoints();
        }

    });

}(window.Backbone, window.jQuery, window._));
