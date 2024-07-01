ASP.NET Core MVC

* docker build -t tychun_image .
* docker run -it --rm -p 5082:8080 --name tychun_image_container tychun_image
* docker run -d --restart=always --name tychun_image_container -p 5082:8080 tychun_image
* docker ps -a
* docker stop tychun_image_container
* docker rm tychun_image_container
* * docker ps -a
* docker rmi tychun_image
* docker images