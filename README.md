https://github.com/Pierre-ZACHARY/fakebrowser_docker

https://github.com/kkoooqq/fakebrowser integration for docker

Just clone and run "docker-compose up"

Fetch any page with :
curl localhost:port/?pageUrl= url & customSleep = millis

pageUrl : the page you want 
customSleep : milliseconds to wait after end of page load ( to let javascript load ), default is 1000

It use google chrome stable for ubuntu, and Windows Device descriptor by default 

