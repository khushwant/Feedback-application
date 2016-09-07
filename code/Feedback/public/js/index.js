$(document).ready(function() {
    makeTemplates();
    render('.mainContainer', 'feedback1', feedback);
    /*render('.items','item', bill.billItems);*/
    bind('.happyExp', function(event) {
        feedBack($(this)[0].currentSrc);
    });
    bind('.sadExp', function(event) {
        feedBack($(this)[0].currentSrc);
    });
});
var changeImage = "http://127.0.0.1:8081/images/sad.png";
function feedBack(src) {
    $(".feedbackScreen").addClass("slideUp");
    var value={};
    var toggleArr=[];
    if (src == changeImage) {
        changeSad();
    }
    bind(".radio", function(event) {
        var sel=$(this).children(".selection");
        var radioText=$(this).children(".radioText");
            if(sel.hasClass("fill")){
                console.log(radioText.text());
                var index=toggleArr.indexOf(radioText.text());
                console.log(index);
                toggleArr.splice(index,1);
                sel.toggleClass("fill");
                console.log(toggleArr);
            }
            
            else{
                console.log(radioText.text());
                toggleArr.push(radioText.text());
                console.log(toggleArr);
                sel.toggleClass("fill");
            }
    });
    bind(".feedbackScreen .reply .selection",function(event){
        $(this).toggleClass("fill");   
    });
    bind('.changeLogo', function() {
        changeFeedBack(this.src);
    });
    bind('.submitAnswer', function() {
        
        value.teaxtAreaDetails=$(".feedbackScreen .form .textareaText").val();
        if($(".reply .selection").hasClass("fill")){
           value.replyToMail="allowed";
           };
        value.array=toggleArr;
        console.log(value);
        textAreaDescription.teaxtAreaDetails(value,function(data){});
        toggleArr=[];
        $(".feedbackScreen .form .textareaText").val("");
        $(".selection").removeClass("fill");
        $(".feedbackScreen").removeClass("slideUp");
    });
}

function changeFeedBack(src) {
    if (changeImage == src) {
        console.log(src);
        changeSad();
    } else {
        console.log(src);
        changeHappy();
    }

}

function changeSad() {
    $(".feedbackScreen .head .logo").attr("src", "../images/sad.png");
    $(".feedbackScreen .head .titleHappy").html('We&apos;re really sorry<br/> Tell us what went wrong');
    $(".feedbackScreen .form .textareaText").attr("placeholder", "What went wrong? How can we do better?");
    $(".feedbackScreen .head .changeLogo").attr("src", "../images/happy.png");
}

function changeHappy() {
    //$(".feedbackScreen .head .change").css("background-image", "../images/sad.png");
    $(".feedbackScreen .head .logo").attr("src", "../images/Happy.png");
    $(".feedbackScreen .head .titleHappy").html("That's great! <br>Tell us what we got right");
    $(".feedbackScreen .form .textareaText").attr("placeholder",'Let us know more...');
    $(".feedbackScreen .head .changeLogo").attr("src", "../images/sad.png");
}

