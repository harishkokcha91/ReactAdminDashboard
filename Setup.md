Commands Summary

docker build -t react-admin-dashboard:v1 .
docker run -d -p 3000:80 react-admin-dashboard:v1
docker ps
docker logs <container-id>



One command rebuild + rerun

docker rm -f react-admin-dashboard 2>/dev/null
docker build --no-cache -t react-admin-dashboard:v1 .
docker run -d --name react-admin-dashboard -p 3000:80 react-admin-dashboard:v1
