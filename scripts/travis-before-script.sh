#!/bin/bash
set -e

npm run lint:ci

ENVIRONMENT=Dev

# install unicreds
wget https://github.com/Versent/unicreds/releases/download/v1.5.0/unicreds_1.5.0_linux_x86_64.tgz
tar xzvf unicreds_1.5.0_linux_x86_64.tgz
chmod +x unicreds
content=$(./unicreds -t U235Config${ENVIRONMENT} -k alias/U235Key${ENVIRONMENT} -r us-east-1 get u235ctrl-config)
if [[ $? -eq 1 ]]; then
  echo "Failed call to unicreds"
else
  echo "$content" > ./src/config/config.json
fi

echo '<!-- Date: '"$(date) -->" >> ./src/index.html
echo '<!-- Build: '"${TRAVIS_BUILD_NUMBER} -->" >> ./src/index.html
echo '<!-- Commit: '"${TRAVIS_COMMIT} -->" >> ./src/index.html
