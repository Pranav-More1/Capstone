from tensorflow.keras.models import load_model
import cv2
import numpy as np
from flask import Flask, request, jsonify

model = load_model('my_skin_disease_pred_model.h5')

# Define class names
class_names = {
    0: 'Melanocytic nevi',
    1: 'Melanoma',
    2: 'Benign keratosis-like lesions',
    3: 'Basal cell carcinoma',
    4: 'Actinic keratoses',
    5: 'Vascular lesions',
    6: 'Dermatofibroma'
}

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['image']
        predicted_class_index, predicted_class_name, predicted_prob, all_probs = predict_image(file)

        # Build a dict of all 7 classes with their percentage scores
        all_predictions = {
            class_names[i]: round(float(all_probs[i]) * 100, 2)
            for i in range(len(class_names))
        }

        res = {
            'predicted_class': predicted_class_name,
            'prediction_probability': str(predicted_prob),
            'all_predictions': all_predictions
        }

        return jsonify(res)


def predict_image(file):
    # Read image
    file_bytes = np.fromfile(file, np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Preprocess image (resize and normalize)
    image = cv2.resize(image, (64, 64))
    image = image.astype('float32') / 255.0
    image = np.expand_dims(image, axis=0)

    predictions = model.predict(image)

    all_probs = predictions[0]
    predicted_class_index = np.argmax(all_probs)
    predicted_prob = all_probs[predicted_class_index]
    predicted_class_name = class_names[predicted_class_index]

    return predicted_class_index, predicted_class_name, predicted_prob, all_probs


if __name__ == '__main__':
    app.run(port=5000)