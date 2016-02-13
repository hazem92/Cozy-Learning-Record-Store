# Starting script
echo "" > results.txt
echo "Results of Tests">> results.txt
echo "" >> results.txt
cat tests.txt | while read line
do
# split string into array
  IFS=' ' read -a request <<< "${line}"
#case verbs
if [ "${request[1]}" = "verbs" ] ;
  then
  if [ "${request[0]}" = "POST" ] ;
    then
    response=$(curl --write-out '%{http_code}' -d ${request[2]} --silent --output /dev/null http://localhost:9250/${request[1]})
    echo $line" .................................. " $response >> results.txt
  fi
  if [ "${request[0]}" = "GET" ] ;
    then
    response=$(curl --write-out '%{http_code}' --silent --output /dev/null http://localhost:9250/${request[1]})
    echo $line" .................................. " $response >> results.txt
  fi
fi
#case actors
if [ "${request[1]}" = "actors" ] ;
  then
  if [ "${request[0]}" = "POST" ] ;
    then
    response=$(curl --write-out '%{http_code}' -d ${request[2]} --silent --output /dev/null http://localhost:9250/${request[1]})
    echo $line" .................................. " $response >> results.txt
  fi
  if [ "${request[0]}" = "GET" ] ;
    then
    response=$(curl --write-out '%{http_code}' --silent --output /dev/null http://localhost:9250/${request[1]})
    echo $line" .................................. " $response >> results.txt
  fi
fi
#case activities
if [ "${request[1]}" = "activities" ] ;
  then
  if [ "${request[0]}" = "POST" ] ;
    then
    response=$(curl --write-out '%{http_code}' -d ${request[2]} --silent --output /dev/null http://localhost:9250/${request[1]})
    echo $line" .................................. " $response >> results.txt
  fi
  if [ "${request[0]}" = "GET" ] ;
    then
    response=$(curl --write-out '%{http_code}' --silent --output /dev/null http://localhost:9250/${request[1]})
    echo $line" .................................. " $response >> results.txt
  fi
fi
#case Statements
if [ "${request[1]}" = "Statements" ] ;
  then
  if [ "${request[0]}" = "POST" ] ;
    then
    response=$(curl --write-out '%{http_code}' -d ${request[2]} --silent --output /dev/null http://localhost:9250/${request[1]})
    echo $line" .................................. " $response >> results.txt
  fi
  if [ "${request[0]}" = "GET" ] ;
    then
    response=$(curl --write-out '%{http_code}' --silent --output /dev/null http://localhost:9250/${request[1]})
    echo $line" .................................. " $response >> results.txt
  fi
fi
done
