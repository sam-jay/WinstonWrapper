# WinstonWrapper
A standalone RESTful logging server built on top of the winston node module. 

----
##### /logger/event (POST)
```json
{
  "priority": "priority_number",
  "data": "data"
}
```
On success, responds 200, otherwise 400.
