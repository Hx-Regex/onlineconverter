function convertToPNG() {
    var imageInput = document.getElementById("image-input");
    var errorMessage = document.getElementById("error-message");
    if (!imageInput.value) {
        errorMessage.innerHTML = "Please select an image";
        return;
    }
    var image = imageInput.files[0];
    var imageName = image.name;
    if (!imageName.endsWith(".webp")) {
        errorMessage.innerHTML = "The selected file is not a JPG image";
        return;
    }
    if (image.size > 5000000) {
        errorMessage.innerHTML = "The selected image is larger than 5MB";
        return;
    }
    var formData = new FormData();
    formData.append("image", image);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/webptopng", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                window.location.href = response.file_url;
            } else {
                errorMessage.innerHTML = response.error;
            }
        }
    };
    xhr.send(formData);
}