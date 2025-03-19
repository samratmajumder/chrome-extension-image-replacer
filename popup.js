document.addEventListener('DOMContentLoaded', function() {
  // Default selected image
  let selectedImage = 'dummy1';

  // Add click events for dummy images
  document.querySelectorAll('.dummy-image').forEach(img => {
    img.addEventListener('click', function() {
      // Remove selected class from all images
      document.querySelectorAll('.dummy-image').forEach(i => {
        i.classList.remove('selected');
      });
      
      // Add selected class to clicked image
      this.classList.add('selected');
      
      // Update selected image
      selectedImage = this.id;
    });
  });

  // Add click event for "Replace Single Image" button
  document.getElementById('replaceSingle').addEventListener('click', function() {
    // Update status message
    document.getElementById('status').textContent = 'Click on an image to replace it';
    
    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'enableSingleReplace',
        imageType: selectedImage
      });
    });
  });

  // Add click event for "Replace All Images" button
  document.getElementById('replaceAll').addEventListener('click', function() {
    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'replaceAllImages',
        imageType: selectedImage
      });
      
      // Update status message
      document.getElementById('status').textContent = 'All images replaced';
    });
  });
});