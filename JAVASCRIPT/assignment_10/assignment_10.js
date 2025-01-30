function change_img_src() {
    document.getElementById('image').src= "image/image 2.webp";
    document.getElementById('changeImagebutton').innerHTML =  "Image Changed" 
}

document.getElementById('changeImagebutton').addEventListener('click', change_img_src);