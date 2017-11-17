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
    var fee = parseFloat($("#fee").text().substring(0, $("#fee").text().length - 1)) / 100 + 1;
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

clickNumber = function (el) {
    var tempAmount = $("#inputAmount").val();
    if ($(el).text() == "." && tempAmount.indexOf(".") > 0) {
        return;
    }else if($(el).text() == "0"){
        if (tempAmount == "0"){
            return;
        }
        if (tempAmount.indexOf(".0")>0){
            return;
        }
    }
    if (el == "D") {
        if (tempAmount.length <= 0) {
            return;
        }
        if( tempAmount.length - 1 == 0){
            $("#inputAmount").val(null);
            $("#amountFake").html(0);
            return;
        }
        tempAmount = tempAmount.substring(0, tempAmount.length - 1);
    } else {
        if($(el).text() != "0" && tempAmount=="0"){
            tempAmount = $(el).text();
        }else{
            tempAmount += $(el).text();
        }
    }
    if (tempAmount.indexOf(".") == 0) {
        tempAmount = "0" + tempAmount;
    }

    if (tempAmount.indexOf(".") > 0 && tempAmount.indexOf(".") + 1 < tempAmount.length) {

        if (tempAmount.substring(tempAmount.indexOf("."), tempAmount.length).length > 3) {
            tempAmount = tempAmount.substring(0, tempAmount.length - 1);
            $("#inputAmount").val(tempAmount);
        } else {
            $("#inputAmount").val(tempAmount);
        }
    } else if (tempAmount.length > 10) {
        tempAmount = tempAmount.substring(0, tempAmount.length - 1);
        $("#inputAmount").val(tempAmount);
    } else {
        $("#inputAmount").val(tempAmount);
    }
    amountChange();
    $("#inputAmount").focus();
};

showInputComponent = function () {
    $("#keyBorderM").removeClass("key-border-customer-hide").addClass("key-border-customer-show");
    $('html, body').animate({
        scrollTop: $("#keyBorderM").offset().top
    }, 1000);

    document.addEventListener('touchmove', function (e) {
        hideInputComponent();
    }, false);
};
hideInputComponent = function () {
    var tempAmount = $("#inputAmount").val();
    if (tempAmount.indexOf(".") == tempAmount.length - 1) {
        $("#inputAmount").val(tempAmount.substring(0, tempAmount.length - 1));
    }
    $("#keyBorderM").removeClass("key-border-customer-show").addClass("key-border-customer-hide");
    //如果弹出对话框时，底层的视图就不让滚动了
    document.addEventListener('touchmove', function (e) {

    }, false);
};

dealThis = function (event) {
    if (event.target.id == "div-input-customer") {
        return true;
    }
    hideInputComponent();
    return true;

};

document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);

var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
    if(event.target.className.indexOf("event-click") >= 0){
        clickNumber(event.target);
    }else if (event.target.className.indexOf("event-delete") >= 0){
        clickNumber("D");
    }
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

deletePic =function (index) {
    $("#fileEvent"+index).val("");
    document.getElementById("img-"+index).src = "";
    $("#pic-"+index).addClass("file-hide");
    for (var i = 1; i <= 3; i++) {
        if (index!=i){
            $("#box-file-"+i).addClass("file-hide");
        }
    }
    $("#box-file-"+index).removeClass("file-hide");
};

function getFileUrl(index) {
    var url;
    var file = document.getElementById("fileEvent"+index);
    var agent = navigator.userAgent;
    if (agent.indexOf("MSIE")>=1) {
        url = file.value;
    } else if(agent.indexOf("Firefox")>0) {
        url = window.URL.createObjectURL(file.files.item(0));
    } else if(agent.indexOf("Chrome")>0) {
        url = window.URL.createObjectURL(file.files.item(0));
    }
    return url;
}

function preImg(index) {
    var accept  = $("#fileEvent"+index).val();
    if (accept.indexOf("jpg") > 0 || accept.indexOf("gif") > 0 || accept.indexOf("png") > 0 ||
        accept.indexOf("JPG") > 0 || accept.indexOf("GIF") > 0 || accept.indexOf("PNG") > 0) {
        $("#pic-"+index).removeClass("file-hide");
        document.getElementById("img-" + index).src = getFileUrl(index);
        $("#box-file-" + index).addClass("file-hide");
        for (var i = 1; i <= 3; i++) {
            if (index != i && !$("#fileEvent" + i).val()) {
                $("#box-file-" + i).removeClass("file-hide");
                break;
            }
            if (i == 3) {
                $("#box-file-" + i).removeClass("file-hide");
            }
        }
    }else{
        $("#fileEvent"+index).val("");
    }
}
