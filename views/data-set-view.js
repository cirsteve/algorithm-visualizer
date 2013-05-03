(function (Backbone, $, _, undefined) {
    DVZ.DataSetView = Backbone.View.extend({
        template: MNKY.TMPL.algoviz_dataset,

        className: 'row',
        
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
            var that = this;
            $('#time-step').slider({
                max: 1250,
                min: 250,
                value: 700,
                change: function (ev, ui) {
                    that.updateTimeStep(ev, ui, that);
                }
            });
            this.initSvg();
            this.initRender();

        },

        prepareDefaults: function (options) {
            console.log('prep d');
            this.blockW = 20;
            this.blockH = 120;
            this.svgHeight = 300;
            this.timeStep = 500;
            this.xSc = d3.scale.linear()
                    .domain([0,1])
                    .range([0,this.blockW]);
            this.ySc = d3.scale.linear()
                    .domain([0,100])
                    .range([0,this.blockH]);
        },

        renderDataPoints: function () {
            console.log('rend');
            var collectionHTML = new DVZ.DataPointsView({collection:this.model.get('collection')});
            this.$el.find('.data-target').html(collectionHTML.el);

        },

        initRender: function () {
            var localFuncs = _.extend({}, this);
            this.svg.selectAll("rect")
                .data(this.dataArray.toJSON(), function (d) { return d.id;})
                .enter().append("rect")
                    .attr("x", function(d,i) {return localFuncs.xSc(i) - .5;})
                    .attr("y", function(d) {return 100 + localFuncs.blockH - localFuncs.ySc(d.dataPoint) - .5;})
                    .attr("width", localFuncs.blockW)
                    .attr("height", function(d) {return localFuncs.ySc(d.dataPoint);});
        },

        initSvg: function () {
            this.svg = d3.select("#d3-target").append("svg")
                    .attr("class","sortees")
                    .attr( "width", (this.dataArray.length) * this.blockW)
                    .attr("height", this.svgHeight);
        },

        renderDataPointsD3: function () {
            console.log('rend3', this.dataArray.toJSON());
            var localFuncs = _.extend({}, this);
            this.svg.selectAll("rect")
                .data(this.dataArray.toJSON(), function (d) { return d.id;})
                .transition().duration(1000)
                    .attr("x", function(d,i) {return localFuncs.xSc(i) - .5;})
                    .attr("y", function(d) {return d.active ? localFuncs.blockH - localFuncs.ySc(d.dataPoint) - .5 : 75 + localFuncs.blockH - localFuncs.ySc(d.dataPoint) - .5;})
                    .attr("class", function(d) {return d.active ? "active" : "";});
        },

        reset: function () {
            this.insModel.set('stopSort',true); 
            delete this.insModel;
            delete this.insView;

            this.dataArray = this.model.createSet().get("collection");
            this.resetRender();
        },

        resetRender: function () {
            var localFuncs = _.extend({}, this);
            this.svg.selectAll("rect")
                .data(this.dataArray.toJSON(), function (d) { return d.id;})
                .transition().duration(1000)
                    .attr("x", function(d,i) {return localFuncs.xSc(i) - .5;})
                    .attr("y", function(d) {return d.active ? localFuncs.blockH - localFuncs.ySc(d.dataPoint) - .5 : 75 + localFuncs.blockH - localFuncs.ySc(d.dataPoint) - .5;})
                    .attr("width", localFuncs.blockW)
                    .attr("height", function(d) {return localFuncs.ySc(d.dataPoint);})
                    .attr("class", "");

        },

        insertion: function () {
            this.insModel = new DVZ.InsertionModel({
                collection:this.model.get('collection'),
                stepDelay: this.timeStepCache || 500
            });

            this.insView = new DVZ.InsertionView({
                svg: this.svg,dataArray: this.dataArray,
                model: this.insModel
            });

            this.insModel.on("redraw", this.insView.render, this);
            this.insModel.sort();
        },
    
        merge: function () {
            var mergeModel = new DVZ.MergeModel({
                    collection:this.model.get('collection')
                }),
                mergeView = new DVZ.MergeView({
                    svg:this.svg,
                    dataArray: this.dataArray
                });
            mergeModel.on("redraw", this.renderDataPointsD3, this);
            mergeModel.sort();
        },

        updateTimeStep: function (ev, ui, that) {
            console.log('time step change ', ev, ui);
            if (that.insModel) {
                that.insModel.set("stepDelay", ui.value);
            } else {
                this.timeStepCache = ui.value;
            }
        }

    });

}(window.Backbone, window.jQuery, window._));
