require([
    'base/MoGu', 
    'ScrollTab',
    'MCUBE_MOD_ID_XXX:tab-item.tpl',
    'MCUBE_MOD_ID_XXX:wall-wrap.tpl',
    'MCUBE_MOD_ID_XXX:wall-item.tpl'
], function(MoGu, ScrollTab, tabItemTpl, wallWrapTpl, wallItemTpl) {

    var tabAndWall = {

        initTab: function(){

            var self = this;

            this.listenLazyData('.MCUBE_MOD_ID_XXX .cata-wrap .lazyData', function($tab, data){

                var data = self.filterData(data);

                // tab tpl
                var html = MoGu.ui.getTemplate(tabItemTpl, data || []);

                $tab.html(html);

                new ScrollTab({
                    $tabWrap: '.MCUBE_MOD_ID_XXX .tab-wrap',
                    maxDataLen: data.length
                });

                // banner + wall's key tpl
                var walhtml =  MoGu.ui.getTemplate(wallWrapTpl, data || []);
                
                $('.mn-wrap').html(walhtml);
                self.wallData();

            });

        },

        // 根据上线时间过滤数据
        filterData: function(data){

            return $.grep(data, function(item, index){

                        var nowTime = +new Date()/1000;

                        // modify 2016-8-8
                        // 无上线时间，则必无下线时间，永久上线（麦田中的规则）
                        if(!parseInt(item.startTime)) return item;

                        // 有上线时间(未上线)
                        if(item.startTime >= nowTime) return;

                        //有上线时间,无下线时间
                        if(!parseInt(item.endTime)) return item;

                        // 有上线时间+有下线时间
                        // 上线期间
                        if(item.startTime < nowTime && item.endTime > nowTime){
                            return item;
                        }

                    });

        },

        listenLazyData: function(elem, callback){

            $(elem).each(function () {
                
                $(this).listenToLazyData(function (evt, status, msg, id, data) {

                    if(data.length <= 0) return;
                    callback && callback($(this), data, id);

                });

            });

        },

        wallData: function(){
            var $customTag=$('.custom-tag');
            var labelTex={};
            labelTex.tagLabelTxt=$customTag.attr('tag-label-txt');
            labelTex.priceLabelTxt=$customTag.attr('price-label-txt');

            MoGu.lazyInstance.prepareAjaxData(true);

            this.listenLazyData('.MCUBE_MOD_ID_XXX .mn-wrap .lazyData', function($wall, data, id){

                var key = $wall.data('source-key');

                if(id == key){

                    $.extend(data, labelTex, {"sourceKey": key});

                    var html = MoGu.ui.getTemplate(wallItemTpl, data || []);

                    $wall.find('.entry-wrap').html(html);

                    MoGu && MoGu.dynamicImage && MoGu.dynamicImage.checkImages();
                }

            });

        }

    };

    $(function(){

        tabAndWall.initTab();

    });

});
