
//=======================================================================================
//Javascript for listing page
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
                    addImage(e.target.result);
                };
                reader.readAsDataURL(file);
                uploadedImages.push(file);
            } else {
                alert("Only images are allowed.");
            }
        }
    }

    function addImage(src) {
        const img = document.createElement("img");
        img.src = src;
        imagePreviewContainer.appendChild(img);
    }
});
