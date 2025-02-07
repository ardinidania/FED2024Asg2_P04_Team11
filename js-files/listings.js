const API_KEY = "09bebc4e7a2e94327256c383312c6a98"; 

document.addEventListener("DOMContentLoaded", function () {
    const uploadBox = document.getElementById("uploadBox");
    const uploadInput = document.getElementById("imageUpload");
    const uploadIcon = document.getElementById("uploadIcon");
    const selectPhotosBtn = document.getElementById("selectPhotosBtn");
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");

    let uploadedImages = [];

    // Open file explorer on click
    selectPhotosBtn.addEventListener("click", function () {
        uploadInput.click();
    });

    uploadIcon.addEventListener("click", function () {
        uploadInput.click();
    });

    // Handle file selection
    uploadInput.addEventListener("change", function (event) {
        const files = event.target.files;
        handleFiles(files);
    });

    // Drag & Drop Feature
    uploadBox.addEventListener("dragover", (event) => {
        event.preventDefault();
        uploadBox.classList.add("drag-over");
    });

    uploadBox.addEventListener("dragleave", () => {
        uploadBox.classList.remove("drag-over");
    });

    uploadBox.addEventListener("drop", (event) => {
        event.preventDefault();
        uploadBox.classList.remove("drag-over");
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        if (uploadedImages.length + files.length > 30) {
            alert("You can only upload up to 30 images.");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    uploadToImgBB(e.target.result); // Upload directly to ImgBB
                };
                reader.readAsDataURL(file);
            } else {
                alert("Only images are allowed.");
            }
        }
    }

    function uploadToImgBB(imageData) {
        const formData = new FormData();
        formData.append("key", API_KEY);
        formData.append("image", imageData.split(",")[1]); // Remove Base64 header

        fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addImage(data.data.url); // Display uploaded image
                console.log("Uploaded Image URL: ", data.data.url);
            } else {
                alert("Image upload failed. Try again.");
            }
        })
        .catch(error => {
            console.error("Error uploading to ImgBB:", error);
            alert("Error uploading image.");
        });
    }
    
    function addImage(src) {
        const uploadedImagesContainer = document.getElementById("uploadedImages");
    
        if (!uploadedImagesContainer) {
            console.error("Error: uploadedImagesContainer not found!");
            return;
        }
    
        // Create an image element
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Uploaded Image";
    
        // Append image to the new uploaded images section
        uploadedImagesContainer.appendChild(img);
    }
    

    
});
