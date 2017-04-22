<template>
    <div class="chat">
        <span v-show="!isConnect" v-on:click="handleJoinBtnClick" class="joinbtn">点击进入聊天室</span>
        <div v-show="isConnect" class="room">
            <h2 class="chattitle" v-html="msg"></h2>
            <div class="chatnotice">
                <span v-html="userNum"></span>参与者
            </div>
            <div class="chatarea">
                <div class="chatlist">
                    <div v-for="(item, index) in chatList" :class="{me:item.isMe}" class="chatitem">
                        <div class="userhead">
                        </div>
                        <span class="username">{{item.userName==userName?'我':item.userName}}</span>
                        <!-- <span class="usermsg" v-html="chatItem.message"></span> -->
                        <span class="usermsg">{{item.message}}</span>
                    </div>
                </div>
            </div>
            <div class="chathelp">
                <div class="nickname-area">
                    <span v-html="userName" @dblclick="isUserNameEditing = true"></span>
                    <input v-show="isUserNameEditing"
                           :value="userName"
                           @keyup.enter="handleUserNameEnter"
                           @keyup.esc="hanleUserNameEsc"
                           @blur="handleUserNameEnter"
                           class="nickname-input" name="" type="text" value=""/>
                </div>
            </div>
            <div class="inputmessage" v-show="isConnect">
                <input name="" type="text"
                       @keyup.enter="handleMessageInputEnter"
                />
            </div>
        </div>
    </div>
</template>

<script>
 import io from 'socket.io-client'
 export default {
     name: 'chat',
     data () {
         return {
             msg: '欢迎进入聊天室',
             isConnect :false,
             isUserNameEditing: false,
             userNum:0,
             userId:'',
             userName:'',
             chatList:[]
         }
     },
     methods: {
         getUserName (name){
             var userNameCookie='';
             if(document.cookie){
                 var cookieArr = document.cookie.split(/;\s*/);
                 cookieArr.forEach(function(cookie, i){
                     if(cookie){
                         var cookieItem = cookie.split('=');
                         if(cookieItem[0] == name){
                             try{
                                 userNameCookie = decodeURIComponent(cookieItem[1]);
                             } catch(e){
                             }
                         }
                     }
                 })
             }
             return userNameCookie;
         },
         setUserName (name, value, expires, path, domain, secure){
             var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
             if(expires){
                 cookieText += ";expires=" + new Date(+new Date()+expires*24*60*60*1000).toGMTString();
             }
             if(path){
                 cookieText += ";path=" + path;
             }
             if(domain){
                 cookieText += ";domain" + domain;
             }
             if(secure){
                 cookieText += ";secure";
             }
             document.cookie = cookieText;
         },
         connectSocket () {
             var _this = this;
             this.socket = io.connect('http://192.168.0.103:3000');
             this.socket.on('user joined', function(data){
                 _this.userNum = data.userNum;
             });
             this.socket.on('user left', function(data){
             });
             this.socket.on('new message', function(data){
                 _this.chatList.push(data);
             });
             this.socket.on('login', function(data){
                 _this.userNum = data.userNum;
             })

         },
         handleJoinBtnClick () {
             var _this = this;
             /* this.userName = this.getUserName('chatUserName');*/
             this.connectSocket();
             this.socket.emit('add user', _this.userName, function(id){
                 _this.userName = '用户' + id;
             });
             this.isConnect = true;
         },
         handleUserNameEnter () {
             this.socket.emit('set username', this.userName, function(userId){
                 _this.userName = '用户'+userId;
                 _this.setUserName('chatUserName', _this.userName, 365);
             })
         },
         handlerUserNameEsc () {
             this.isUserNameEditing = false;
         },
         handleMessageInputEnter (e) {
             const message = e.target.value;
             var _this = this;
             if(message){
                 var data = {
                     userName: _this.userName,
                     message
                 };
                 this.socket.emit('new message', data);
                 this.chatList.push(Object.assign({}, data, {isMe:true}));

                 e.target.value  = '';
             }

         }
     },
     created () {
         /* this.userName = this.getUserName('chatUserName');*/
     },
     mounted (){
         /* this.connectSocket();*/
     },
     updated (){
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .chat{
     height:100%;
     background:#16152c;
     color:#fff;
 }
 .joinbtn{
     font-weight: bold;
     font-size:0.3rem;
     color: #d96f8f;
 }
 .room{
     font-size:0.14rem;
 }
 .chattitle{
     padding: 20px;
     font-size:0.2rem;
 }
 .chatarea{
     width:80%;
     margin: 0 auto;
     background:#fff;
     color:#333;
     padding: 0.2rem;
     border-radius: 0.08rem;
 }
 .chatlist{
 }
 .chatitem{
     display:flex;
     flex-direction: row;
     align-items:center;
     margin-bottom:0.2rem;
     &.me{
         flex-direction: row-reverse;
     }
 }
 .username{
     display:block;
     width: 0.4rem;
 }
 .usermsg{
     padding: 0.08rem;
     border-raiuds:0.04rem;
     color:#000;
     background-color:rgba(56,209,52, 0.8);
     border:1px solid #115c10;
     border-radius:0.04rem;
 }
</style>
