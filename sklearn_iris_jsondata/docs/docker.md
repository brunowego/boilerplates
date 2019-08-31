# Docker

## Build

```sh
make docker/build
```

## Running

```sh
make docker/run
```

## Status

```sh
make docker/status
```

## Logs

```sh
make docker/logs
```

## Test

### cURL

```sh
curl \
  -sX POST \
  -d 'json=
{
  "data": {
    "names": [
      "sepal_length",
      "sepal_width",
      "petal_length",
      "petal_width"
    ],
    "ndarray": [
      [
        7.233,
        4.652,
        7.39,
        0.324
      ]
    ]
  }
}' \
  "http://$(docker-machine ip):5000/predict" | jq
```

### Contract

```sh
make docker/test
```

## Remove

```sh
make docker/remove
```

## Push

```sh
make docker/push
```
