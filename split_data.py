from fileinput import filename
import os

SPLIT = 0.2

for dir_name in os.listdir('train'):
    if(dir_name == ".DS_Store"):
        continue
    count = 0
    files = os.listdir('train/' + dir_name)
    top = int(len(files) * SPLIT)

    os.mkdir('test/' + dir_name)
    for file_name in files:
        print(file_name)
        os.rename(f"train/{dir_name}/{file_name}",
                  f"test/{dir_name}/{file_name}")
        count += 1
        if count == top:
            break
