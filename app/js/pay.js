var dc = [];

function record(index){
    var i =0;
    for( ;i <= index;i++){
        $("#record-start-"+i).removeClass("star-bg-empty").addClass("star-bg-full");
    }
    for(;i <= 5;i++){
        $("#record-start-"+i).removeClass("star-bg-full").addClass("star-bg-empty");
    }
    $("#recodeStar").val(index);
}

function amountChange(element){
    //汇率
    var rate = parseInt($("#rate-php").text());
    var amountTotal = $(element).val() * rate;
    console.log($(element).val().toString().length);
    if(amountTotal < 0){
        $(element).val(0);
    }else{
        if(amountTotal.toString().length > 10){
            $("#amountFake").removeClass("big-font-120").addClass("big-font-90").html(amountTotal)
        }else{
            $("#amountFake").html(amountTotal);
        }

    }
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
slipInit = function(type){
    var ele = document.getElementById("slip");
    var mySlip = Slip(ele, "x").slider().width(350);
    var all = $("#slip").children("section").length;
    mySlip.end(function() {
        if(all<=3 && this.page > 2){
            mySlip.jump(0);
        }else if( this.page + 2 == all){
            mySlip.jump(this.page=this.page-2);
        }else if(this.page + 1 == all){
            mySlip.jump(this.page==this.page-3);
        }
        console.log(this.page);
    });
    if(type == 0){
        $('html,body').addClass('ovfHiden');
    }

};

flipClick=function(){
    $("#opposite").addClass("out").removeClass("in");
    setTimeout(function() {
        $("#face").addClass("in").removeClass("out");
    }, 225);
};
closeBox=function(){
    $('html,body').removeClass('ovfHiden');
    $("#gift").hide()
};

submit = function(formId){
    document.getElementById(formId).submit();
};