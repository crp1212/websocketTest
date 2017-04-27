var express = require('express');
var http=require('http')
var app = express();
var fs=require('fs')
app.get('/', function(req, res){
  res.send('hello world');
});
var server=http.createServer(app)
server.listen(1591);
app.use(express.static('src'))
var io=require('socket.io').listen(server);
var onlineUser={count:0,users:{}}
io.on('connection',function(socket){
	//客户端与服务器建立链接时触发
	var usernames,
		index,
		ids=socket.id;
	//console.log('客户端连接上');
	//console.log(socket.id)//socket.id提供唯一标识,每次更新都会获得
	socket.on('message',function(msg){//这里的message是一一对应的
		//客户端发来信息时触发
	});
	socket.on('disconnect',function(){
		//客户端断开链接时触发
		delete onlineUser.users[ids]  //删除这个属性
		socket.broadcast.emit('leaveuser',{username:usernames})
		onlineRemind();
	});
	socket.on('username',function(data){
		//得到新加入的用户名就广播
		onlineUser.users[ids]=data.username;
		usernames=data.username;
		socket.broadcast.emit('newuser',{username:data.username})
		onlineRemind();
	});
	socket.on('myContent',function(data){
		socket.emit('selfContent',data);
		socket.broadcast.emit('otherContent',data);//向其他用户广播自己的内容
	})
	socket.on('sendImg',function(data){
		var options={

		}
		fs.writeFile(__dirname+'/src/img/'+data.name,data.filedata,function(){
			socket.emit('selfImg',{url:'img/'+data.name,username:usernames});
			socket.broadcast.emit('otherImg',{url:'img/'+data.name,username:usernames});//向其他用户广播自己的内容
		})
	})
	socket.on('sendFile',function(data){
		var options={

		}
		fs.writeFile(__dirname+'/src/file/'+data.name,data.filedata,function(){
			socket.emit('selfFile',{url:'file/'+data.name,username:usernames,filename:data.name});
			socket.broadcast.emit('otherFile',{url:'file/'+data.name,username:usernames,filename:data.name});//向其他用户广播自己的内容
		})
	})
	function onlineRemind(){
		var arr=Object.keys(onlineUser.users)
		var arrs=arr.map((x)=>{return onlineUser.users[x]})
		io.emit('onlinePeople',{users:arrs,ids:arr})
	}
	//socket.send()//服务器向客户端发送数据
})