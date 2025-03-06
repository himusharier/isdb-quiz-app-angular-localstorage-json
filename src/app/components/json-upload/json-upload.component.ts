import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-json-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './json-upload.component.html',
  styleUrl: './json-upload.component.css'
})
export class JsonUploadComponent {

  storageKey: string = ''; // To store the localStorage key input
  selectedFile: File | null = null; // To store the selected file

  // Method to handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.selectedFile && this.storageKey) {
      this.readFileAndSaveToLocalStorage(this.selectedFile, this.storageKey);
    } else {
      alert('Please provide both a localStorage key and a JSON file.');
    }
  }

  // Method to read the file and save it to localStorage under the provided key
  readFileAndSaveToLocalStorage(file: File, key: string): void {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        // Parse the JSON data
        const parsedData = JSON.parse(reader.result as string);

        // Save the parsed data into localStorage under the provided key
        localStorage.setItem(key, JSON.stringify(parsedData));
        alert('Data saved to localStorage with key: ' + key);
      } catch (e) {
        console.error('Error parsing JSON:', e);
        alert('There was an error parsing the JSON file.');
      }
    };

    // Read the file as text
    reader.readAsText(file);
  }

}
