var dc = [];

function record(index){
    var i =0;
    for( ;i <= index;i++){
        $("#record-"+i).removeClass("glyphicon-star-empty");
        $("#record-"+i).addClass("glyphicon-star");
    }
    for(;i <= 5;i++){
        $("#record-"+i).removeClass("glyphicon-star");
        $("#record-"+i).addClass("glyphicon-star-empty");
    }
}

function amountChange(element){
    console.log($(element).val());
}

function discussChoose(value){
    for(var i =0 ;i < dc.length;i++){
        if(dc[i] == value){
            $("#discuss-type-" + value).parent().removeClass("discuss-box-select");
            $("#discuss-type-" + value).parent().addClass("discuss-box-select-n");
            dc.splice(i,1);
            return;
        }
    }
    if(dc.length < 3){
        dc.push(value);
        $("#discuss-type-" + value).parent().removeClass("discuss-box-select-n");
        $("#discuss-type-" + value).parent().addClass("discuss-box-select");
    }
}
$(function(){
    var ele = document.getElementById("slip");
    var mySlip = Slip(ele, "x").slider().width(350);
    var all = $("#slip").children("section").length;
    var isJump = false;
    mySlip.start(function(event) {
            console.log('start');

            // 事件对象
            console.log(event);
            // 当前坐标值
            console.log(this.coord);
        })
        .move(function(event) {
            console.log('move');

        })
        .end(function() {
            console.log(this.page);
            if (all > 3){
                if(this.page+3 > all && !isJump){
                    mySlip.jump(all-3);
                    isJump =true;
                }
            }else{
                mySlip.jump(0);
            }

            // 滑动方向
            console.log(this.orient);
        });

    console.log($("#slip").children("section").length)
});