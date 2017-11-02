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