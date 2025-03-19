let singleReplaceMode = false;
let selectedDummyImage = '';

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'enableSingleReplace') {
    // Enable single replace mode
    singleReplaceMode = true;
    selectedDummyImage = request.imageType;
    addClickListenersToImages();
  } else if (request.action === 'replaceAllImages') {
    // Replace all images
    singleReplaceMode = false;
    replaceAllImages(request.imageType);
  }
});

// Function to add click event listeners to all images
function addClickListenersToImages() {
  if (!singleReplaceMode) return;
  
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', handleImageClick);
  });
}

// Function to handle image click in single replace mode
function handleImageClick(e) {
  if (!singleReplaceMode) return;
  
  // Prevent the click from propagating to the website
  e.preventDefault();
  e.stopPropagation();
  
  // Replace the clicked image
  replaceSingleImage(e.target, selectedDummyImage);
  
  // Disable single replace mode after replacing an image
  singleReplaceMode = false;
  
  // Remove click event listeners from all images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.cursor = '';
    img.removeEventListener('click', handleImageClick);
  });
}

// Function to replace a single image
function replaceSingleImage(imgElement, dummyType) {
  // Use web accessible resources instead of direct URL
  // We'll use placeholder images from a reliable external source for testing
  let dummyUrl;
  
  // Choose a placeholder based on the selected dummy type
  switch(dummyType) {
    case 'dummy1':
      dummyUrl = 'https://placehold.co/600x400?text=Ankit+Image+1';
      break;
    case 'dummy2':
      dummyUrl = 'https://placehold.co/https://www.ford.com/is/image/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2025/collections/dm/24_FRD_MST_60983_2.tif?croppathe=1_3x2&wid=900';
      break;
    case 'dummy3':
      dummyUrl = 'https://media.istockphoto.com/id/176667558/photo/sport-car.jpg?s=612x612&w=0&k=20&c=3ie9FXvDFfAYVEFYUpV_1FWdiF9jRU8VlDuW2H32eng=';
      break;
    default:
      dummyUrl = 'https://placehold.co/600x400?text=Ankit+Image+1';
  }
  
  // Store original size
  const originalWidth = imgElement.width || 300;
  const originalHeight = imgElement.height || 200;
  
  // Replace image source
  imgElement.src = dummyUrl;
  
  // Maintain original size
  imgElement.width = originalWidth;
  imgElement.height = originalHeight;
}

// Function to replace all images
function replaceAllImages(dummyType) {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    replaceSingleImage(img, dummyType);
  });
}