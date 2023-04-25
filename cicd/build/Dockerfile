#FROM node:lts-alpine3.14
FROM node:14.21.3-alpine as build-stage
# 在容器中创建一个目录来存放应用，接下来会将应用的代码复制到这里
WORKDIR /app

# 更换Debian源
#RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

#RUN apt-get update \
#&&  apt-get install -y \
#    vim \
#    wget

# 复制应用的 package.json 和 package-lock.json 文件
COPY package*.json ./
# 安装项目依赖
RUN npm install
# 将代码复制到容器中
COPY . .
# 设置默认环境变量
ENV NODE_ENV development
# 构建应用
RUN npm run build
# 暴露容器端口
EXPOSE 8080
# 在容器启动时运行的命令
CMD ["npm", "start"]