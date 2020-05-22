#!bin/bash

# Install Docker + docker-compose on latest Ubuntu 19.10 / 20.04

apt-get update -yqq 
apt-get install -yq mc htop git wget curl make unzip
apt-get install -yq docker.io
systemctl enable --now docker
apt-get install -yq docker-compose
