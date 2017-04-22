<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
 import _ from 'underscore'
 import * as tools from './util/tools.js'
 export default {
     name: 'app',
     mounted () {
         const _this = this;
         const html = document.getElementsByTagName('html')[0];
         console.log('tools',tools)
         const handleResizeWindow = () => {
             const windowWidth = tools.getWindowSize().w;
             html.style.fontSize = windowWidth * 100 / 750 + 'px';
         };
         handleResizeWindow();
         window.addEventListener('resize', handleResizeWindow, false);
     }
 }
</script>

<style>
 * {
     margin:0;
     padding: 0;
     box-sizing: border-box;
 }
 html, body{
     height: 100%;
     margin: 0;
     padding: 0;
 }
 h1, h2 {
     font-weight: normal;
 }

 ul {
     list-style: none;
     padding: 0;
 }


 #app {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     height: 100%;
     /* margin-top: 60px; */
 }
</style>
