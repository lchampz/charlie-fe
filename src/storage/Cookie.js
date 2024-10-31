export class Cookie {
    
    static setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
        expires = "; expires=" + date.toUTCString(); 
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  
    
    static getCookie(name) {
      const parsedName = name + "=";
      const cookiesArray = document.cookie.split(';'); 

      const findedCookie = cookiesArray.find((cookie) => {
        if(cookie.trim().indexOf(parsedName) === 0) return cookie.substring(parsedName.length, cookie.length);
      })
      
      if (!findedCookie) return null; 

      const cookieValue = findedCookie.split("=")[1];

      return cookieValue ?? null;
     
    }
  
    static eraseCookie(name) {
      document.cookie = name + "=; Max-Age=-99999999;";
    }
  
    static checkCookie(name) {
      const cookie = this.getCookie(name);
      return cookie !== null;
    }
  }
  
  