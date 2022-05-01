from flask import Flask, redirect, url_for, render_template, request, jsonify
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

            response = {'test': 12}
            print(response)
            return jsonify(response)
        except Exception as e:
            print(e)
            return jsonify({'Status': 'Failed', 'msg': str(e)})

if __name__ == '__main__':
    app.run(debug=True)