  ///// Clear button Function
  
  document.querySelector(".clear-files").addEventListener("click", function() {
    const input = document.getElementById("image-input");
    input.value = "";
    
    const fileNameDivs = document.querySelectorAll(".file");
    fileNameDivs.forEach(function(div) {
      div.style.display = "none";
      div.textContent = "";
    });
   const clear = document.getElementById("hx");
    clear.style.display = "none";
  });
  
  
  
  