# Inhouse LLM - Text Processor

This project implements a Text Processor web application using HTML, CSS, Bootstrap, and JavaScript. It allows users to input text or upload PDF files for summarization and headline generation.

## Features

- Summarize Text: Users can input or upload text, and the application will generate a summary of the input.
- Generate Headline: Users can input or upload text, and the application will generate a headline based on the input.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Open the `index.html` file in your preferred web browser.

3. Select the desired file type (Text or PDF) and input your text or upload a PDF file accordingly.

4. Click on the "Summarize" or "Generate Headline" buttons to perform the respective actions.

## Project Structure

- `index.html`: The main HTML file containing the structure of the web page.
- `style.css`: The CSS file for styling the web page.
- `script.js`: The JavaScript file containing the logic for handling user input and making API calls.

## Dependencies

- [Bootstrap](https://getbootstrap.com/): Front-end framework for styling.
- [pdf.js](https://mozilla.github.io/pdf.js/): Library for rendering PDF documents.

## Usage

- Choose the file type (Text or PDF) and input your text or upload a PDF file.
- Click on the "Summarize" button to get a summary or "Generate Headline" to generate a headline.

## API Endpoints

- `/summarize`: POST endpoint for summarizing text.
- `/generate_headline`: POST endpoint for generating a headline.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
