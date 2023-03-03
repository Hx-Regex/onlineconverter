$(document).ready(function(){
  $(".nav-link.dropdown-toggle").click(function(){
    $(this).parent().toggleClass("show");
  });
});
