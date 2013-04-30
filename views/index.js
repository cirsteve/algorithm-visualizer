(function (Backbone, _, $, undefined) {
    var __super__ = MNKY.PageView.prototype;
    
    DVZ.IndexPageView = MNKY.PageView.extend({
        template: MNKY.TMPL.algoviz_index,
        
        initialize: function () {
            __super__.initialize.call(this, arguments);
            var dataSet = new DVZ.DataSet(),
                dataSetView = new DVZ.DataSetView({model:dataSet});
            //$('#dvz-target').html(dataSetView.el);
            //dataSetView.renderDataPointsD3();
        },

        render: function () {
            __super__.render.call(this, arguments);
        }

    });
}(window.Backbone, window._, window.jQuery));
