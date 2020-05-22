#!bin/bash

# Prune docker system and remove all containers, images, volumes with one command.

docker system prune
docker container stop $(docker container ls -aq)
docker container rm $(docker container ls -aq)
docker rmi $(docker images -aq)
docker volume prune
