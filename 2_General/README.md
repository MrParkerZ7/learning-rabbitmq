# learning-rabbitmq

### Run

- yarn install
- yarn rabbmit
- yarn publisher
- yarn consumer

### Postman

- [POST] : /sendLog
- With log info

```json
{
  "logType": "Info",
  "message": {
    "event": "Learning Genral Level",
    "body": "Empty"
  }
}
```

- [POST] : /sendLog
- With log warning

```json
{
  "logType": "Warning",
  "message": {
    "event": "Learning Genral Level",
    "body": "Empty"
  }
}
```

### Ref Doc

- https://youtu.be/igaVS0S1hA4
