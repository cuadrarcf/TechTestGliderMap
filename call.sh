# Question 1 call
curl 'https://jsonplaceholder.typicode.com/posts' \
  -H 'authority: jsonplaceholder.typicode.com' \
  -H 'sec-ch-ua: "Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36' \
  -H 'content-type: application/json; charset=UTF-8' \
  -H 'accept: */*' \
  -H 'origin: http://localhost:3000' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: http://localhost:3000/' \
  -H 'accept-language: en-US,en;q=0.9,es;q=0.8' \
  --data-binary '{"title":"title-1","body":"body-2","userId":1337}' \
  --compressed
