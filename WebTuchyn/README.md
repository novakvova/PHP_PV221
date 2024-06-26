# Create react app in docker

Create docker hub repository - publish
```
docker build -t tuchyn-api . 
docker run -it --rm -p 5082:8080 --name tuchyn_container tuchyn-api
docker run -d --restart=always --name tuchyn_container -p 5082:8080 tuchyn-api
docker ps -a
docker stop tuchyn_container
docker rm tuchyn_container

docker images --all
docker rmi tuchyn-api

docker login
docker tag tuchyn-api:latest novakvova/tuchyn-api:latest
docker push novakvova/tuchyn-api:latest

docker pull novakvova/tuchyn-api:latest
docker ps -a
docker run -d --restart=always --name tuchyn_container -p 5082:8080 novakvova/tuchyn-api


docker pull novakvova/tuchyn-api:latest
docker images --all
docker ps -a
docker stop tuchyn_container
docker rm tuchyn_container
docker run -d --restart=always --name tuchyn_container -p 5082:8080 novakvova/tuchyn-api
```

```nginx options /etc/nginx/sites-available/default
server {
    server_name   tuchyn.itstep.click *.tuchyn.itstep.click;
    location / {
       proxy_pass         http://localhost:5082;
       proxy_http_version 1.1;
       proxy_set_header   Upgrade $http_upgrade;
       proxy_set_header   Connection keep-alive;
       proxy_set_header   Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header   X-Forwarded-Proto $scheme;
    }
}

sudo systemctl restart nginx
certbot
```



