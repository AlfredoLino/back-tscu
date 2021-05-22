# Docker Commands

docker rm |container-name| -f

docker run -p |PORT|:|PORT| -d --name |container-name| |image-name|

docker ps

docker image ls

docker exec -it |container-name| bash

docker run -v $(pwd):/app -p |PORT|:|PORT| -d --name |container-name| |image-name|