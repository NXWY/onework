{{~it:item:index }}

    <div data-source-key="{{=item.IDsourceKey}}" class="item item{{=index}} {{? index == 0 }}item-on{{?}}">
        
        {{ 
            var titleWrapCss = "background: url("+item.picInTitle+") no-repeat left center; background-size: 0.7rem auto; padding-left: 0.8rem;"; 
        }}

        <div class="title-wrap" style="{{=titleWrapCss}}">
            
            <div class="title text-hide">
                {{=item.title }}
            </div>

            <div class="sub-title text-hide">
                {{=item.subTitle }}
            </div>

        </div>

    </div>

{{~}}