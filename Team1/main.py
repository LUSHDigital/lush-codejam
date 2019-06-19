from flask import Flask, render_template, url_for, request, redirect
import image_handler


app = Flask(__name__)


@app.route('/')
def home_page():
    list = []
    file = open('product.csv', 'r')
    for i in file:
        row = []
        entry = i.split(',')
        if entry == ['', '\n']:
            pass
        else:
            row.append(entry[0])
            row.append(entry[1])
            list.append(row)
    return render_template('home.html', images=list)


@app.route('/animation')
def animation():
    name = request.args.get('key')
    image_handler.download_image(name)
    return render_template('main.html',
                           colour=image_handler.get_image_colour())


if __name__ == '__main__':
    app.run(debug=True)
