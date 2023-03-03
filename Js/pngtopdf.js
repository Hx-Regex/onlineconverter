


    ///////////// DRAG AND DROP FUNCTION ///////////////



const mainArea = document.getElementById("main");
const dropText = document.querySelectorAll('.drag-block')[0];
const mainblock = document.getElementsByClassName('main-block')[0];


let isDragOver = false;

mainArea.addEventListener('dragenter', () => {
  isDragOver = true;
  mainblock.style.display = 'none';
  dropText.style.display = 'flex';
});



mainArea.addEventListener('dragover', (event) => {
  isDragOver = true;
  mainblock.style.display = 'none';
  dropText.style.display = 'flex';
  event.preventDefault();
});

mainArea.addEventListener('drop', (event) => {
  dropText.style.display = 'none';
  mainblock.style.display = 'flex';
  event.preventDefault();

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    // Add the files to the image-input element
    const imageInput = document.getElementById('image-input');
    imageInput.files = files;
    handleFileInputChange(files)

    // Check the image-input in JavaScript
    // ...
  }

  mainArea.style.background = 'transparent';
  dropText.style.display = 'none';
});

/// Get Input Function with Multiple files and file name + create the block for the file

document.getElementById("image-input").addEventListener("change", function() {
  const files = this.files;
  handleFileInputChange(files);
    
  });
  




  
                    //////////////////////// Convert Files From A to B ////////////////////////
                    //////////////////////// Convert Files From A to B ////////////////////////
                    //////////////////////// Convert Files From A to B ////////////////////////





  
  document.getElementById("image-conv").addEventListener("click", function() {
    const input = document.getElementById("image-input");
    const files = input.files;
    const option1 = document.querySelector('#option-1');
    const option2 = document.querySelector('#option-2');
    const option3 = document.querySelector('#option-3');
  
    if (!files.length) {
      Swal.fire({
        title: 'Warning',
        text: 'Make sure to upload a file first',
        type: 'warning',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

        /////////// LandScape  OPTION //////////////
    if (option2.checked) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
          const imgData = e.target.result;
          const image = new Image();
          image.src = imgData;
          image.onload = function() {
            const pdf = new jsPDF({
              orientation: "landscape",
              unit: "px",
              format: "a4"
            });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const scaleFactor = pageWidth / image.width;
            const scaledHeight = image.height * scaleFactor;
            pdf.addImage(imgData, "PNG", 0, (pdf.internal.pageSize.getHeight() - scaledHeight) / 2, pageWidth, scaledHeight);
            pdf.save(`${file.name.split(".")[0]}.pdf`);
          };
        };
        reader.readAsDataURL(file);
        
      }
    }

    //////////// PORTRAIT OPTION ////////////
    if (option1.checked) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
    
      
        const reader = new FileReader();
        reader.onload = function(e) {
          const imgData = e.target.result;
          const image = new Image();
          image.src = imgData;
          image.onload = function() {
            const pdf = new jsPDF({
              orientation: "portrait",
              unit: "px",
              format: "a4"
            });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const scaleFactor = pageWidth / image.width;
            const scaledHeight = image.height * scaleFactor;
            pdf.addImage(imgData, "PNG", 0, (pdf.internal.pageSize.getHeight() - scaledHeight) / 2, pageWidth, scaledHeight);
            pdf.save(`${file.name.split(".")[0]}.pdf`);
          };
        };
        reader.readAsDataURL(file);
        
      }
    }

    ////////// ORIGINAL OPTION //////////
    if (option3.checked) {
      for (let i = 0; i < files.length; i++) {


        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
          const imgData = e.target.result;
          const image = new Image();
          image.src = imgData;
          image.onload = function() {
            const pdf = new jsPDF({
              orientation: "portrait",
              unit: "px"
            });
            pdf.internal.pageSize.setWidth(image.width);
            pdf.internal.pageSize.setHeight(image.height);
            pdf.addImage(imgData, "PNG", 0, 0, image.width, image.height);
            pdf.save(`${file.name.split(".")[0]}.pdf`);
          };
        };
        reader.readAsDataURL(file);
        
        
      }
    }




    Swal.fire({
      title: 'Converted Successfully',
      type: 'success',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    const fileNameDivs = document.querySelectorAll(".file");
    fileNameDivs.forEach(function(div) {
      div.style.display = "none";
      div.textContent = "";
    });
   const clear = document.getElementById("hx");
    clear.style.display = "none";
    input.value = "";
  });
  

               //////////////////////// C ////////////////////////
                    //////////////////////// C ////////////////////////
                    //////////////////////// C function to hanfle input ////////////////////////


  function handleFileInputChange(files) {
    const fileBlock = document.getElementById("file-block");
    const fileDivs = fileBlock.getElementsByClassName("file");
    const clear = document.getElementById("hx");
    const input = document.getElementById("image-input");
    if (files.length > 3) {
      Swal.fire({
        title: 'Error',
        text: 'You have selected more than 3 files. Please select only 3 files. you can reupload more files by converting 3 by 3',
        type: 'error',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      input.value = "";
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (file.type !== "image/png") {
        Swal.fire({
          title: 'Error',
          text: 'Make sure the file is a PNG',
          type: 'error',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        input.value = "";
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Error',
          text: 'Please Uplaod Files with less than 5MB',
          type: 'error',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      input.value = "";
        return;
      }
  
      fileDivs[i].innerHTML = file.name;
      fileDivs[i].style.display = "block";
  
      clear.style.display = "block";
      }
      Swal.fire({
        title: 'Uploaded Successfully',
        type: 'success',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      
  
      setTimeout(function() {
        uploadedSuccessfullyDiv.style.display = "none";
      }, 1500);
    // the rest of the code remains the same
  }