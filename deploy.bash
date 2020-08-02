cd /root/Timos-Api
git stash
git pull

npm config set ignore-scripts true
npm i
npm config set ignore-scripts false

pm2 restart main
