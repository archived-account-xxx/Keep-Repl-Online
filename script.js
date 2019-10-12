form = document.getElementById("form")
notificationsContainer = document.getElementById("n-container")
function appendNotifications(message,color){
  notification = document.createElement("div")
  notification.innerText = message
  notification.style.backgroundColor = color
  notification.style.borderColor = color
  notification.onclick = function(){
    this.hidden = true
  }
  notification.className = "notifications"
  notificationsContainer.append(notification)
    setTimeout(function(){
    notification.hidden = true
  },5000)
}
form.addEventListener("submit",function(e){
  e.preventDefault()
  xhr = new XMLHttpRequest()
  xhr.open("POST","/",true)
  xhr.setRequestHeader("Content-Type","application/json")
  info = {
    "url":document.getElementById("url").value
  }
  xhr.send(JSON.stringify(info))
  xhr.onreadystatechange = function(){
    if(xhr.status == 200 && xhr.readyState == 4){
    if(xhr.responseText == "notrepl"){
      appendNotifications("Please enter a repl.co url","red")
    }else if(xhr.responseText == "success"){
      appendNotifications("The url has been added","green")
    }else if(xhr.responseText == "error"){
      appendNotifications("There was an error","red")
    }else if(xhr.responseText == "ERR_ALREADY_ON_SYSTEM"){
      appendNotifications("Url is already on our database","red")
    }
    }
  }
})