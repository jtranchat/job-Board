$(document).ready(function(){
    $("p[id='learnMore']").hide();

    $("input[id='buttonMore']").click(function (e) { 
        var parent = this.parentNode;
        console.log(parent);
        var paragraphe = $(parent).find("#learnMore");
        $(paragraphe).toggle();
    });
});