# !/bin/bash

echo "|-------- Beginning of Running Back-End Script --------|"
echo "Installing NPM Dependencies:"
time npm install
echo "Removing Files Older Than 2 Days in the 'logs' dir:"
find ./logs -type f -mtime +2 -exec rm {} \;
echo "Setting up Logging Solution (for Later Backend Debugging):"
log_dir="./logs"
if [ -d "$log_dir" ]; then
    echo "Directory $log_dir already exists."
else
    mkdir "$log_dir"
    echo "Directory $log_dir created."
fi
cd "$log_dir"
file_name="log_$(date +'%m-%d-%y-%T').txt"
touch $file_name
cd ..
echo "Running JavaScript MongoDB/Express.js/Node.js Backend (with TypeScript):"
npm run format
npm_config_color=always npm run start 2>&1 | tee -a "./logs/$file_name"
echo "|-------- End of Running Back-End Script --------|"
