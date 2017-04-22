export const cookie = {
    set(name, val, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(val);
        if(expires) {
            cookieText += ';expires=' + new Date(+new Date + expires*24*60*60*1000).toGMTString();
        }
        if(path) {
            cookieText += ';path=' + path;
        }
        if(domain) {
            cookieText += ';domain' + domain;
        }
        if(secure){
            cookieText += ';secure';
        }
        document.cookie = cookieText;
    },
    get(name) {
        var cookieArr = document.cookie.split(/;\s*/);
        var value  = '';
        cookieArr.forEach(function(cookie, i){
            var cookieItem = cookie.split('=');
            if(cookieItem[0] === name){
                try{
                    value = decodeURIComponent(cookieItem[1]);
                }catch(e){
                }
            }
        });
        return value;
    },
    remove (name, path, domain, secure) {
        this.set(name, '', 0, path, domain, secure);

    }
};
export function getWindowSize(){
    var  w = 0,
        h = 0;
    if(document.documentElement && document.documentElement.clientHeight){
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
    }else if(document.body && document.body.clientHeight){
        w = document.body.clientWidth;
        h = document.body.clientHeight;
    }else  if(window.innerHeight){
        w = window.innerWidth;
        h = window.innerHeight;
    }
    return {
        w,
        h
    };
};
