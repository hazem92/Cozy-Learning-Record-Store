
This a bash script to run a set of tests ( HTTP requests) on the cozy applications and prints out a list of the requests sent and the HTTP (header) code obtained in result.
The list will be printed in the results.txt file.

To use the script, you have to write in tests.txt file (line by line) which request you want to try.
The request should be in the followed form :
HTTP action URI list of parameters :
Example :
        POST verbs display=doo
        GET verbs

We treat separately different HTTP action and different URIs to perform more specific treatments
