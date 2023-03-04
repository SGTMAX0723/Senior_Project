var zip = new JSzip();

// Add an top-level, arbitrary text file with contents
zip.file("Hello.txt", "Hello World\n");

// Generate a directory within the Zip file structure
var img = zip.folder("css");

// Add a file to the directory, in this case an image with data URI as contents
img.file("smile.gif", imgData, {base64: true});

// Generate the zip file asynchronously
zip.generateAsync({type:"blob"})
.then(function(content) {
    // Force down of the Zip file
    saveAs(content, "archive.zip");
});