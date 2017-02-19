<div class="mod_row MCUBE_MOD_ID_XXX">
    <!-- tab 配置 -->
    {% $tabSet = $data['formData']['atabSet']['models'][0] %}
    {% $tabNum = $tabSet['tabNum'] %}
    {% $sourceKey = $tabSet['sourceKey'] %}

    <!-- 价格标签，显示价格折扣，按钮颜色 -->
    {% $goodWallStyle = $data['formData']['bGoodWallStyle']['models'][0] %}
    {% $priceLabelTxt = $goodWallStyle['priceLabel'] %}
    {% $priceButtonColor = $goodWallStyle['priceButtonColor'] %}
    {% $tagLabelTxt = $goodWallStyle['tagLabel'] %}
    {% $tagBg = $goodWallStyle['tagBg'] %}

    <style type="text/css">

        .MCUBE_MOD_ID_35586 .wall-wrap .iwf .goods-info .act-slogan {
            color: {% $priceButtonColor %};
            border-color: {% $priceButtonColor %};
        }
        .MCUBE_MOD_ID_35586 .wall-wrap .iwf .goods-info .btn-buy {
            background: {% $priceButtonColor %};
        }
        .MCUBE_MOD_ID_35586 .wall-wrap .iwf .img-tag {
            background-image: url({% $tagBg %});
        }

    </style>

    <input type="hidden" class="custom-tag" tag-label-txt ="{% $tagLabelTxt %}" price-label-txt="{% $priceLabelTxt %}"/>

    <!-- tab area -->
    <div class="cata-wrap ios-sticky" data-tab-num="{% $tabNum %}">
        
        <div class="tab-wrap-empty"></div>
        <div class="tab-wrap-outer">

            <div class="tab-wrap-inner">
                <div class="tab-wrap cate-box" tab-num-inview="{% $tabNum %}">

                    <div class="tab clearfix scrollTouch lazyData" data-source-key="{% $sourceKey %}" data-source-type="mce" data-manual="true"></div>

                </div>
            </div>
            
        </div> 

    </div>
    
    <!-- 图墙 area -->
    <div class="mn-wrap"></div>

</div>