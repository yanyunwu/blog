# linux常用命令



#### 查看端口

lsof -i:端口号



firewall-cmd --zone=public --add-port=3306/tcp --permanent

firewall-cmd --reload        #重启firewall 

firewall-cmd --list-ports    #查看已经开放的端口