/**
 * Created by Abraham on 6/25/2016.
 */
//check off specific todo list by clicking
$("ul").on("click","li",function(){
   $(this).toggleClass("completed");
});


// click on x to delete

$("ul").on("click","span",function(event){
    $(this).parent().remove().fadeOut(500, function () {
        $(this).remove();
    }); // remove the click element
    event.stopPropagation();


});


$("input[type = 'text']").keypress(function(event){
    if(event.which === 13 ){  // which to detect the enter key
        var todoText = $(this).val(); // grab to do new text from input
        $(this).val(""); // clear the form
        $("ul").append("<li><span><i class='fa fa-trash-o' aria-hidden='true'></i></span> " + todoText + "</li>") // create new li and add to ul
    }


});

$(".fa-plus").click (function () {
    $("input[type = 'text']").fadeToggle();
});



