rm -rf ../server/static
npm run build
cp -r ./build ../server/static
cp ./rec.wav ../server/static/rec.wav
