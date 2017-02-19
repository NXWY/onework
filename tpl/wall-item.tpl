{{~it:item:index}}

<div class="iwf show-log-item" data-log-content="{{=item.acm}}"
     data-log-index="{{=index}}" data-log-iid="{{=item.item_id}}">
    {{
        var goPattern = /Go4Android|Go4iPhone/i;
        var uastr = navigator.userAgent.toLowerCase();
        var isapp = goPattern.test(uastr);
        
        item.item_url_h5 = "http://m.mogujie.com/go/goods/detail/"+item.item_id;

        if(isapp){
            item.item_url_h5 = item.item_url;
        }
    }}

    <a class="goods-url pushWindow" href="{{=item.item_url_h5}}"
       data-ext-acm="{{=item.acm}}">

        <div class="img-wrap J_dynamic_imagebox" img-src="{{=item.image}}_320x999.jpg" style="padding-bottom: 150%;">
            <div class="img-tag">
                <span>{{=it.tagLabelTxt }}</span>
            </div>
        </div>
        
        {{? item.itemInventory != undefined && item.itemInventory <= 0 }}
        <div class="saleout-img-wrap"></div>
        {{?}}

        <div class="goods-info">
            <p class="title text-hide">{{=item.title}}</p>
            <div class="price-wrap">
                <span class="act-slogan">{{=it.priceLabelTxt}}</span>
                <span class="newprice">
                    <em>￥</em>{{=item.discountPrice}}
                </span>
            </div>
            <div class="oldprice">原价<del>￥{{=item.price}}</del></div>
            <div class="btn-buy">立即购买</div>
        </div>
    </a>
</div>

{{~}}