export const loadImage = (src: string) => {
  return new Promise((resolve) => {
    const id = `load_image_${src}`
    const image = document.createElement("img");
    image.src = src;
    image.id = id;
    image.style.visibility = "hidden";
    image.style.display = "none";
    image.loading = 'eager'
    image.onload = function () {
      resolve(true);
      document.body.removeChild(image);
    }
    image.onerror = function () {
      resolve(false);
      console.log(`Load image error with src: ${src}`);
      document.body.removeChild(image);
    }
    document.body.appendChild(image);
  })
}