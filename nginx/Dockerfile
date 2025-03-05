FROM nginx:1.25.4-alpine3.18
WORKDIR /etc/nginx
COPY ./default.conf ./conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]