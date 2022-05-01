from flask import Flask, redirect, url_for, render_template, request, jsonify
from keras.models import load_model
import numpy as np 
import cv2

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html', data=[0]*6)

@app.route('/image', methods=['POST'])
def upload_image():
    if request.method == 'POST':
        try:
            data = request.get_json()
            img = data['img'] # list image from upload
            print(img)
            model = load_model('model\my_model_weights.h5')
            dic = {0: 'Apple', 1: 'Avocado', 2: 'Banana', 3: 'Orange', 4: 'Strawberry', 5: 'Watermelon'}

            response = {
                'Apple': [], 'Avocado': [], 'Banana': [], 'Orange': [], 'Strawberry': [], 'Watermelon': []
            }
            

            for i in img: 
                path = r'img/{}'.format(i)
                test_img = cv2.imread(path)
                pre = np.argmax(model.predict(test_img.reshape(1,100,100,3)))
                response[dic[pre]].append(path)
                
            # print(response)
            return jsonify(response)
        except Exception as e:
            print(e)
            return jsonify({'Status': 'Failed', 'msg': str(e)})

if __name__ == '__main__':
    app.run(debug=True)