from flask import Flask, request, jsonify, Response
from tensorflow.keras.models import load_model
from tensorflow import keras
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, r2_score
import pandas as pd
import io
from flask_cors import CORS
import os
import base64

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the pre-trained model
model = load_model('my_model.h5')

@app.route('/predict', methods=['POST'])

def predict():
    data = request.get_json()
    DEPTH = float(data["depthValue"])
    RES = float(data["resValue"])
    DEN = float(data["pcValue"])
    Caliper = float(data["caliperValue"])
    GR = float(data["grValue"])
    SONIC = float(data["phValue"])
    NPHI = float(data["nphiValue"])

    # Prepare the features as a nested list
    features = [[DEN, GR, NPHI, RES, Caliper, DEPTH]]
    prediction = model.predict(features)
    print(prediction)
    return jsonify({'prediction': float(prediction[0][0])})

@app.route('/plot', methods = ["POST"])
def plot():
    print("here")
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filename = file.filename
    
    file_extension = os.path.splitext(filename)[1].lower()
    if file_extension == '.xlsx':
        engine = 'openpyxl'
    elif file_extension == '.xls':
        engine = 'xlrd'
    else:
        return jsonify({"error": "Unsupported file format. Please upload an .xls or .xlsx file."}), 400

    # Read the file into a Pandas DataFrame
    try:
        new_data = pd.read_excel(file, engine=engine) 
    except Exception as e:
        return jsonify({"error": "Failed to read Excel file", "details": str(e)}), 400

    # Ensure the file contains the required 'pressure' column
    if 'FP' not in new_data.columns:
        return jsonify({"error": "File must contain 'FP' column."}), 400
    
    dseats_2024 = new_data.drop("FP", axis = 1)  # Replace with actual data source
    pressure = new_data["FP"]       # Replace with actual data source

    X1_train, X1_val, y1_train, y1_val = train_test_split(dseats_2024, pressure, test_size=0.2, random_state=42)

    # Scale the features
    scaler = StandardScaler()
    # X_train_scaled = scaler.fit_transform(X1_train)
    # X_val_scaled = scaler.transform(X1_val)

    # Build the ANN model using Functional API
    input_layer = keras.layers.Input(shape=X1_train.shape[1:])
    hidden1 = keras.layers.Dense(30, activation='relu')(input_layer)
    hidden2 = keras.layers.Dense(30, activation='relu')(hidden1)
    concat = keras.layers.Concatenate()([input_layer, hidden2])
    output_layer = keras.layers.Dense(1)(concat)
    model = keras.models.Model(inputs=[input_layer], outputs=[output_layer])
    model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mean_squared_error'])

    # Train the model
    history = model.fit(X1_train, y1_train, epochs=10, batch_size=32, validation_split=0.2)

    # Make predictions on the test set
    y_pred = model.predict(X1_val)

    # Plot actual vs predicted values
    plt.figure(figsize=(8, 6))
    plt.scatter(y1_val, y_pred)
    plt.plot([min(y1_val), max(y1_val)], [min(y1_val), max(y1_val)], color='red', lw=2)
    plt.title('Actual vs Predicted Formation Pressure')
    plt.xlabel('Actual Pressure')
    plt.ylabel('Predicted Pressure')

    # Save and return the plot as a PNG
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    
    # Model performance evaluation
    mae = mean_absolute_error(y1_val, y_pred)
    r2 = r2_score(y1_val, y_pred)
    
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')
    
    print(f"MAE: {mae}, R2 Score: {r2}")

    # return Response(img.getvalue(), mimetype='image/png')
    return jsonify({'MAE': float(mae),"r2":r2, "img": img_base64})


app.route('/predict-2', methods=['POST'])
def predict2():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filename = file.filename
    
    file_extension = os.path.splitext(filename)[1].lower()
    if file_extension == '.xlsx':
        engine = 'openpyxl'
    elif file_extension == '.xls':
        engine = 'xlrd'
    else:
        return jsonify({"error": "Unsupported file format. Please upload an .xls or .xlsx file."}), 400

    # Read the file into a Pandas DataFrame
    try:
        new_data = pd.read_excel(file, engine=engine) 
    except Exception as e:
        return jsonify({"error": "Failed to read Excel file", "details": str(e)}), 400
    prediction = model.predict(new_data)
    print(prediction)

    # Prepare the features as a nested list
    
if __name__ == '__main__':
    app.run(debug=True)
