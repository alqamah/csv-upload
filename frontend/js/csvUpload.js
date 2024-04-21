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
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        console.log('File uploaded successfully');
        fileInput.value = '';
        fetchUploadedFiles();
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
});

async function fetchUploadedFiles() {
  try {
    //console.log('Fetching uploaded files...');
    const response = await fetch('/home', { method: 'GET' });
    const files = await response.json();
    console.log('Files fetched:', files);
    uploadedFilesList.innerHTML = '';
    files.forEach(file => {
      const row = document.createElement('tr');
      const filenameCell = document.createElement('td');
      filenameCell.textContent = file.filename;
      const actionsCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'me-2');
      deleteButton.addEventListener('click', () => deleteFile(file._id));
      const viewButton = document.createElement('button');
      viewButton.textContent = 'View';
      viewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      viewButton.addEventListener('click', () => viewFile(file.path));
      actionsCell.appendChild(deleteButton);
      actionsCell.appendChild(viewButton);
      row.appendChild(filenameCell);
      row.appendChild(actionsCell);
      uploadedFilesList.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching uploaded files:', error);
  }
}

async function deleteFile(fileId) {
  try{
    console.log(`Deleting file with ID: ${fileId}`);
    const response = await fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fileId })
    });
    if (response.ok) {
      console.log('File deleted successfully');
      //redirect to /home
      fetchUploadedFiles();
    }
  }catch(error){
    console.error('Error deleting file:', error);
  }
}

function viewFile(filePath) {
  // Add your code here to open or display the file at the given filePath
  console.log(`Opening file at path: ${filePath}`);
}

fetchUploadedFiles();