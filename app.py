from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image
import torchvision.transforms.functional as TF
import CNN
import numpy as np
import torch
import pandas as pd

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

disease_info = pd.read_csv('disease_info.csv', encoding='cp1252')
supplement_info = pd.read_csv('supplement_info.csv', encoding='cp1252')

model = CNN.CNN(39)    
model.load_state_dict(torch.load("plant_disease_model_1_latest.pt"))
model.eval()

def prediction(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index

@app.route('/')
def home_page():
    return jsonify({"message": "Welcome to Plant Disease Detection API"})

@app.route('/submit', methods=['POST'])
def submit():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image = request.files['image']
    filename = image.filename
    file_path = os.path.join('static/uploads', filename)
    image.save(file_path)
    print(file_path)
    
    pred = prediction(file_path)
    title = disease_info['disease_name'][pred]
    description = disease_info['description'][pred]
    prevent = disease_info['Possible Steps'][pred]
    image_url = disease_info['image_url'][pred]
    supplement_name = supplement_info['supplement name'][pred]
    supplement_image_url = supplement_info['supplement image'][pred]
    supplement_buy_link = supplement_info['buy link'][pred]
    
    return jsonify({
        "title": title,
        "description": description,
        "prevent": prevent,
        "image_url": image_url,
        "supplement_name": supplement_name,
        "supplement_image_url": supplement_image_url,
        "supplement_buy_link": supplement_buy_link
    })

if __name__ == '__main__':
    app.run(debug=True)

