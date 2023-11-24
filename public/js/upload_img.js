let img_upload = document.getElementById('img_upload')
let inputFile = document.getElementById('input-file')

inputFile.onchange = function(){
    img_upload.src = URL.createObjectURL(inputFile.files[0])
}