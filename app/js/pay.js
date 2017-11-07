var dc = [];

function record(index) {
    var i = 0;
    for (; i <= index; i++) {
        $("#record-start-" + i).removeClass("star-bg-empty").addClass("star-bg-full");
    }
    for (; i <= 5; i++) {
        $("#record-start-" + i).removeClass("star-bg-full").addClass("star-bg-empty");
    }
    $("#recodeStar").val(index);
}

function amountChange() {
    //汇率
    var rate = parseFloat($("#rate-php").text());
    var fee = parseFloat($("#fee").text().substring(0,$("#fee").text().length-1))/100+1;
    //精确到小数点后2位
    var amountTotal = Math.ceil((parseFloat($("#inputAmount").val()) * rate) * fee * 100) / 100;
    if (amountTotal < 0) {
        $("#inputAmount").val(0);
    } else {
        if (amountTotal.toString().length > 10) {
            $("#amountFake").removeClass("big-font-120").addClass("big-font-90").html(amountTotal)
        } else if (amountTotal == 0) {
            $("#amountFake").html(0);
        } else {
            $("#amountFake").html(amountTotal);
        }
    }
}

function discussChoose(value) {
    for (var i = 0; i < dc.length; i++) {
        if (dc[i] == value) {
            $("#discuss-type-" + value).parent().removeClass("discuss-box-select");
            $("#discuss-type-" + value).parent().addClass("discuss-box-select-n");
            dc.splice(i, 1);
            return;
        }
    }
    if (dc.length < 3) {
        dc.push(value);
        $("#discuss-type-" + value).parent().removeClass("discuss-box-select-n");
        $("#discuss-type-" + value).parent().addClass("discuss-box-select");
    }
}

slipInit = function (type) {
    var ele = document.getElementById("slip");
    var mySlip = Slip(ele, "x").slider().width(350);
    var all = $("#slip").children("section").length;
    mySlip.end(function () {
        if (all <= 3 && this.page > 2) {
            mySlip.jump(0);
        } else if (this.page + 2 == all) {
            mySlip.jump(this.page = this.page - 2);
        } else if (this.page + 1 == all) {
            mySlip.jump(this.page == this.page - 3);
        }
        console.log(this.page);
    });
    if (type == 0) {
        $('html,body').addClass('ovfHiden');
    }

};

flipClick = function () {
    $("#opposite").addClass("out").removeClass("in");
    setTimeout(function () {
        $("#face").addClass("in").removeClass("out");
    }, 225);
};
closeBox = function () {
    $('html,body').removeClass('ovfHiden');
    $("#gift").hide()
};

submit = function (formId) {
    document.getElementById(formId).submit();
};

discussInit = function () {
    FastClick.attach(document.body);
};

clickNumber = function(el){
    var tempAmount = $("#inputAmount").val();
    if($(el).text() == "." && tempAmount.indexOf(".") > 0){
        return;
    }
    if($(el).text() == "D"){
        if(tempAmount.length <=0){
            return;
        }
        tempAmount = tempAmount.substring(0,tempAmount.length-1);
    }else{
        tempAmount += $(el).text();
    }
    if (tempAmount.indexOf(".") == 0) {
        tempAmount = "0" + tempAmount;
    }

    if (tempAmount.indexOf(".") > 0 && tempAmount.indexOf(".")+1 < tempAmount.length) {

        if (tempAmount.substring(tempAmount.indexOf("."), tempAmount.length).length > 3) {
            tempAmount = tempAmount.substring(0, tempAmount.length - 1);
            $("#inputAmount").val(tempAmount);
        }else{
            $("#inputAmount").val(tempAmount);
        }
    } else if (tempAmount.length > 8) {
        tempAmount = tempAmount.substring(0, tempAmount.length - 1);
        $("#inputAmount").val(tempAmount);
    }else{
        $("#inputAmount").val(tempAmount);
    }
    amountChange();
    $("#inputAmount").focus();
};

showInputComponent = function () {
    $("#keyBorderM").removeClass("key-border-customer-hide").addClass("key-border-customer-show");
};
hideInputComponent = function(){
    var tempAmount = $("#inputAmount").val();
    if(tempAmount.indexOf(".")==tempAmount.length-1){
        $("#inputAmount").val(tempAmount.substring(0, tempAmount.length - 1));
    }
    $("#keyBorderM").removeClass("key-border-customer-show").addClass("key-border-customer-hide");
};