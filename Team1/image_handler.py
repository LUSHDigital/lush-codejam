import requests
import pprint
import colorgram
import math


def get_image_from_name(name):
    params={
        'key':'',
        'cx':'',
        'q':'lush bath bombs '+name}
    try:
        data = requests.get('https://www.googleapis.com/customsearch/v1?',
                            params).json()
        image_url = data['items'][0]['pagemap']['product'][0]['image']
        return image_url
    except:
        return False


def par_image_url():
    file = open('names.csv', 'r')
    out = open('product.csv', 'a')
    for i in file:
        print(i)
        image = get_image_from_name(i)
        print(image)
        if image is False:
            pass
        else:
            out.write(i+','+image+'\n')
    file.close()
    print('finish')


def get_image_colour():
    colors = colorgram.extract('input.jpg', 6)
    list = []
    for i in colors:
        row = []
        row.append(i.rgb.r)
        row.append(i.rgb.g)
        row.append(i.rgb.b)
        row.append(get_image_note(row))
        list.append(row)
    return list


def get_image_note(row):
    file = open('notes.csv', 'r')
    closet_note = [1000,'']
    for i in file:
        split = i.split(',')
        note_distance = math.sqrt(abs(((row[0]-int(split[0]))**2)+
                                      ((row[1]-int(split[1]))**2)+
                                      ((row[2]-int(split[2]))**2)))
        if note_distance < closet_note[0]:
            closet_note = [note_distance, int(split[3].split('\n')[0])]
    return closet_note[1]



def find_in_list(name):
    file = open('product.csv', 'r')
    for i in file:
        split = i.split(',')
        if split[0] == name:
            return split[1]


def download_image(name):
    url = find_in_list(name)
    img_data = requests.get(url).content
    with open('input.jpg', 'wb') as handler:
        handler.write(img_data)


if __name__ == '__main__':
    pprint.pprint(get_image_colour())
