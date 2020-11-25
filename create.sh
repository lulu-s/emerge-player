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
cp ../../data/test.vtt ./
cd ..

cd screenA
cp ../../assets/files/screenA/Horizon NaviNet™ Mapping.mp4 ./
cp ../../assets/files/screenA/地平线 NaviNet™ 高精度视觉建图.mp4 ./
cp ../../assets/files/screenA/地平线NaviNet增强感知解决方案——基于征程®3 AI 芯片.mp4 ./
cp ../../assets/files/screenA/Horizon Navinet™ Localization.mp4 ./
cp ../../assets/files/screenA/Horizon Navinet™ Map Update.mp4 ./
cd ..

cd screenB
cp ../../assets/files/screenA/地平线高级别无人驾驶360°视觉感知解决方案.mp4 ./
cp ../../assets/files/screenA/激光雷达+摄像头传感器感知融合方案.mp4 ./
cp ../../assets/files/screenA/激光雷达3D目标检测和跟踪.mp4 ./
cp ../../assets/files/screenA/多摄像头3D目标检测和跟踪.mp4 ./
cd ..

cd screenC
cp ../../assets/files/screenA/地平线征程2单目前视ADAS感知方案.mp4 ./
cp ../../assets/files/screenA/Horizon Journey™ 2 based Mono-Camera Vision Perception Solution for ADAS.mp4 ./
cp ../../assets/files/screenA/低速自动驾驶系统——基于地平线征程® 3 AI芯片.mp4 ./
cd ../../../../../../

cp -R srvao-ipad/glue-pod/gui/assets main/dist/