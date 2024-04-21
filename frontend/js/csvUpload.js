const form = document.getElementById('csvUploadForm');
const uploadedFilesList = document.getElementById('uploadedFilesList');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const fileInput = document.getElementById('csvFileInput');
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const response = await fetch('/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully');
        console.log('File uploaded successfully');
        fileInput.value = ''; // Clear the file input field
        fetchUploadedFiles(); // Fetch and update the list of uploaded files
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
});

// Function to fetch the list of uploaded files
async function fetchUploadedFiles() {
  try {
    const response = await fetch('/home', {
      method: 'GET'
    });
    const files = await response.json();
    console.log('Files fetched:', files);
    // Clear the existing list
    uploadedFilesList.innerHTML = '';

    // Populate the list with uploaded files
    files.forEach(file => {
      const li = document.createElement('li');
      li.textContent = file.filename;
      uploadedFilesList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching uploaded files:', error);
  }
}

// Fetch the list of uploaded files on page load
fetchUploadedFiles();