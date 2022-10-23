# learning-general

### Links

- http://localhost:3000/

### Run
```bash
yarn install
yarn publisher
yarn consumer
```

### Postman

- [POST] : /sendLog
- With log info

```json
{
  "keyName": "Info",
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
  "keyName": "Warning",
  "message": {
    "event": "Learning Genral Level",
    "body": "Empty"
  }
}
```

### Ref Doc

- https://youtu.be/igaVS0S1hA4
