
/// DRAG AND DROP ///
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


//// Convert Files From A to B

document.getElementById("image-conv").addEventListener("click", function() {
  const input = document.getElementById("image-input");
  const files = input.files;
  
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
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    const image = new Image();
    image.src = URL.createObjectURL(file);
    
    image.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d").drawImage(image, 0, 0);
      
      canvas.toBlob(function(blob) {

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^/.]+$/, "")+"-Converted"+ ".png";
        a.click();
        Swal.fire({
          title: 'Converted Successfully',
          type: 'success',
          icon: 'success',
          confirmButtonText: 'Ok'
        });

      }, "image/png");
    };
  }
  
    for (let i = 0; i < 3; i++) {
      const div = document.querySelectorAll(".file")[i];
    div.innerHTML = "";
    div.style.display = "none";
  }
  const clear = document.getElementById("hx")
  clear.style.display = "none"

  input.value = "";
});

///// Clear button Function

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
    
    if (file.type !== "image/jpeg") {
      Swal.fire({
        title: 'Error',
        text: 'Make sure the file is a JPG',
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