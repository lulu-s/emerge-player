cp -R assets srvao-ipad/glue-pod/gui/

cd srvao-ipad/glue-pod/gui/assets/

mkdir files
cd files

mkdir overlayScreen
mkdir screenA
mkdir screenB
mkdir screenC

cd overlayScreen
cp -R ../../data/无纸化办公新时代 ./
cp ../../data/无纸办公新时代.png ./
cp ../../data/_prefix-01.png ./
cp ../../data/test.mp4 ./
cd ..

cd screenA
cp ../../data/无纸办公新时代.png ./
cp ../../data/bg.png ./
cp ../../data/test.mp4 ./
cd ..

cd screenB
cp -R ../../data/无纸化办公新时代 ./
cp ../../data/无纸办公新时代.png ./
cp ../../data/bg.png ./
cd ..

cd screenC
cp -R ../../data/无纸化办公新时代 ./
cp ../../data/bg.png ./
cp ../../data/test.mp4 ./
cd ../../../../../../

cp -R srvao-ipad/glue-pod/gui/assets main/dist/