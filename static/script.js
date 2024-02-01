function processText(text) {
    document.getElementById('userInput').value = text;
}

function extractTextFromPDF() {
    return new Promise((resolve, reject) => {
        var fileInput = document.getElementById('pdfUpload');
        var fileTypeSelect = document.getElementById('fileType');
        var file = fileInput.files[0];
        console.log(fileTypeSelect.value);
        if (file && fileTypeSelect.value=='pdf') {
            var reader = new FileReader();

            reader.onload = function (e) {
                var data = new Uint8Array(e.target.result);
                pdfjsLib.getDocument(data).promise.then(function (pdf) {
                    var promises = [];

                    for (var pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                        var promise = pdf.getPage(pageNumber).then(function (page) {
                            return page.getTextContent();
                        }).then(function (textContent) {
                            return textContent.items.map(function (s) { return s.str; }).join(' ');
                        });

                        promises.push(promise);
                    }

                    Promise.all(promises).then(function (pageTexts) {
                        var text = pageTexts.join(' ');
                        // Now you have the extracted text, you can perform further processing
                        processText(text);
                        resolve(); // Resolve the promise when text extraction is complete
                    });
                });
            };

            reader.readAsArrayBuffer(file);
        } else {
            resolve();
        }
    });
}

function summarizeText() {
    extractTextFromPDF().then(() => {
        var userInput = document.getElementById('userInput').value;
        var resultArea = document.getElementById('resultArea');
        var loading = document.getElementById('loading');

        resultArea.innerHTML = '';
        loading.style.display = 'block';

        fetch('/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({ 'text': userInput }).toString()
        })
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';
            resultArea.innerHTML = '<p><strong>Summary:</strong></p><p>' + data.summary + '</p>';
        })
        .catch(error => {
            loading.style.display = 'none';
            resultArea.innerHTML = '<p>An error occurred while summarizing the text.</p>';
        });
    });
}

function generateHeadline() {
    extractTextFromPDF().then(() => {
        var userInput = document.getElementById('userInput').value;
        var resultArea = document.getElementById('resultArea');
        var loading = document.getElementById('loading');

        resultArea.innerHTML = '';
        loading.style.display = 'block';

        fetch('/generate_headline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({ 'text': userInput }).toString()
        })
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';
            resultArea.innerHTML = '<p><strong>Generated Headline:</strong></p><p>' + data.headline + '</p>';
        })
        .catch(error => {
            loading.style.display = 'none';
            resultArea.innerHTML = '<p>An error occurred while generating the headline.</p>';
        });
    });
}

