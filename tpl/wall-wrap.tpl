{{~it: item: index}}

    <div class="mn-container j_wall{{=index}} {{? index == 0}} show {{?}}">
        
        <div class="banner-wrap">
                
            {{? item.banner }}

                {{
                    var WH = item.banner.match(/\d+x\d+/gi)[0].split('x');
                    var pb = WH[1]/WH[0] * 100;
                }}

                <div style="padding-bottom: {{=pb}}%;" class="banner J_dynamic_imagebox" img-src="{{=item.banner}}">
                </div>

            {{?}}

        </div>
        
        <div class="wall-wrap lazyData" data-source-key="{{=item.IDsourceKey}}" data-source-type="mce" data-manual="true"
             data-ptp="_rmc_{{=item.IDsourceKey}}">
            
            <div class="wall-list clearfix entry-wrap rec-show-log"></div>

        </div>
        
    </div>

{{~}}