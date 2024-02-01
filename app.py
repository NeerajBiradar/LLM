import torch
from transformers import T5ForConditionalGeneration, T5Tokenizer, pipeline,AutoModel
from flask import Flask, render_template, request, jsonify
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.chains.summarize import load_summarize_chain
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


app = Flask(__name__)

if torch.cuda.is_available():
    device = torch.device("cuda")
    print("GPU is available.")
    print("Using GPU:", torch.cuda.get_device_name(0))
else:
    device = torch.device("cpu")
    print("GPU is not available. Using CPU.")

pipe_sum = pipeline(
    'summarization',
    model = "philschmid/bart-large-cnn-samsum"
)

headline_model = T5ForConditionalGeneration.from_pretrained("Michau/t5-base-en-generate-headline")
headline_tokenizer = T5Tokenizer.from_pretrained("Michau/t5-base-en-generate-headline")
headline_model = headline_model.to(device)
headline_model.eval()


@app.route('/')
def home():
    return render_template('Frontend.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    if request.method == 'POST':
        text = request.form['text']
        result = pipe_sum(text)
        result = result[0]['summary_text']
        return jsonify({'summary': result})
    
@app.route('/generate_headline', methods=['POST'])
def generate_headline():
    if request.method == 'POST':
        text = request.form['text']
        text = "headline : "+text
        encoding = headline_tokenizer.encode_plus(text, return_tensors = "pt")
        input_ids = encoding["input_ids"].to(device)
        attention_masks = encoding["attention_mask"].to(device)
        beam_outputs = headline_model.generate(
            input_ids = input_ids,
            attention_mask = attention_masks,
            max_length = 64,
            num_beams = 3,
            early_stopping = True,
        )

        headline = headline_tokenizer.decode(beam_outputs[0])
        return jsonify({'headline': headline})

if __name__ == '__main__':
    app.run(debug=True)