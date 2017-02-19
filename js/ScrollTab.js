define('ScrollTab', [], function(){

    var CONFIG = {
        $tabWrap: '.MCUBE_MOD_ID_XXX .tab-wrap',  //滚动元素
        isAnimating: false,
        requestId: '',
        maxDataLen: ''  //接口返回的最大tab长度                                                      
    };

    function ScrollTab(opts){

        this.cfg = $.extend({}, CONFIG, opts || {});
        this.cfg.$tabWrap = $(this.cfg.$tabWrap);
        this.cfg.tabOffsetTop = $('.cata-wrap').offset().top;

        this.init();
    }

    ScrollTab.prototype = {

        constructor: ScrollTab,

        isSupportSticky: (function () {
              var vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'],
                vendorListLength = vendorList.length,
                stickyElement = document.createElement('div');

              for (var i = 0; i < vendorListLength; i++) {
                stickyElement.style.position = vendorList[i] + 'sticky';
                if (stickyElement.style.position !== '') {
                  return true;
                }
              }
              return false;
        })(),

        init: function(){
            
            // 绑定fastclick
            if (window.FastClick) {
                new window.FastClick(document.body);
            }

            this._calculate();

            this._switch();

            this._polyfill();
        },

        _calculate: function(){
            // 容器宽
            var containerWidth = this.cfg.$tabWrap.width();
            // 默认显示tab数量
            var num_inview = this.cfg.$tabWrap.attr('tab-num-inview'),
                num_inview = num_inview < 3 ? 3 : num_inview;

            // 真实数据小于设置的值
            if(this.cfg.maxDataLen < num_inview) num_inview = this.cfg.maxDataLen;

            // 所有tab item
            var $items = this.cfg.$tabWrap.find('.item');
            //单个 tab 宽
            var itemWidth = containerWidth/num_inview; 

            this.tab = {
                num: $items.length,
                num_inview: num_inview, 
                width: $items.length * itemWidth,   //整个 tab宽度
                itemWidth: itemWidth,               //单个 tab 宽
                maxScroll: ($items.length - num_inview) * itemWidth //最大可滚动值
            }

            this._updateTab();
        },

        _updateTab: function(){
            this.cfg.$tabWrap.find('.tab').width(this.tab.width);
            this.cfg.$tabWrap.find('.item').width(this.tab.itemWidth);
        },

        _animate: function(Dis){

            var self = this;
            var preScrollLeft = -1;
            var targetDom = '';

            function doAnimate(targetX){
                    
                self.isAnimating = true;
                targetDom = self.cfg.$tabWrap[0];

                if(preScrollLeft === targetDom.scrollLeft) {
                    self.isAnimating = false;
                    preScrollLeft = -1;
                    return ;//avoid repeat move
                } else {
                    preScrollLeft = targetDom.scrollLeft;
                }
                if (targetX >= targetDom.scrollLeft + 10) { //左->右
                    
                    targetDom.scrollLeft += 10;

                } else if ((targetX < targetDom.scrollLeft + 10 && targetX > targetDom.scrollLeft) || (targetX > targetDom.scrollLeft - 10 && targetX < targetDom.scrollLeft)) {
                    targetDom.scrollLeft = targetX;

                } else if (targetX <= targetDom.scrollLeft - 10) { //右->左
                    targetDom.scrollLeft -= 10;
                }
                if (targetDom.scrollLeft != Math.floor(targetX)) {
                    self.cfg.requestId = requestAnimationFrame(doAnimate.bind(this, targetX));
                } else {
                    preScrollLeft = -1;
                    self.isAnimating = false;
                }
            }
            doAnimate(Dis);

        },

        _animatePreHandle: function(index){

            //计算滚动距离
            cancelAnimationFrame(this.cfg.requestId);

            var step = this.tab.num_inview/2;

            if(index < step && index >=0) {
                if (this.cfg.$tabWrap[0].scrollLeft > 0) {
                    this._animate(0);
                }
            }else if(index >= step){
                var Dis = (index - Math.floor(step)) * this.tab.itemWidth > this.tab.maxScroll 
                            ? this.tab.maxScroll : (index - Math.floor(step)) * this.tab.itemWidth;
                this._animate(Dis);
            }

        },

        _switch: function(){
            var self = this;
            
            // 绑定点击标签事件
            this.cfg.$tabWrap.on('click', '.item', function(e) {
                e.preventDefault();

                var $this = $(this);
                if ($this.hasClass('item-on') || self.isAnimating) return;

                $this.addClass('item-on')
                     .siblings('.item').removeClass('item-on');

                //预处理tab滑动
                self._animatePreHandle($this.index());
                
                //触发图墙数据
                self._triggerWall($this.index());

            });
        },

        _triggerWall: function(index){
            var self = this;

            $('.j_wall'+index).addClass('show')
                              .siblings('.show').removeClass('show');

            $(window).scrollTop(self.cfg.tabOffsetTop);  

            MoGu && MoGu.dynamicImage && MoGu.dynamicImage.checkImages();

        },

        _polyfill: function(){

            var self = this;

            /**
             * ios优化滚动 scrollTouch
             * 避免iphone6plus 使用-webkit-overflow-scrolling:touch crash
             * @return {[type]} [description]
             */
            (function(){
                var isIos8 = /OS [5-8]_\d[_\d]* like Mac OS X/i.test(window.navigator.userAgent);
                var windowWidth = $(window).width();
                
                if(isIos8 && windowWidth === 414) self.cfg.$tabWrap.find('.tab').removeClass('scrollTouch');
            })();

            /**
             * 对不支持sticky的浏览器做兼容
             * @return {[type]} [description]
             */
            (function(){

                if(this.isSupportSticky) return;

                $('.cata-wrap').removeClass('ios-sticky').addClass('no-sticky')

                var originTop = self.cfg.$tabWrap.offset().top;

                $(window).on('scroll', function() {

                    var _scrollTop = $(window).scrollTop(),
                        isFixed = $('.tab-wrap-outer').hasClass('MOD_TAB_FIX');

                    if (_scrollTop > originTop && !isFixed) {
                        $('.tab-wrap-outer').addClass('MOD_TAB_FIX');
                    } else if (_scrollTop <= originTop && isFixed) {
                        $('.tab-wrap-outer').removeClass('MOD_TAB_FIX');
                    }
                    
                });

            }.bind(this))();

        }

    }

    return ScrollTab;

});