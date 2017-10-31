
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