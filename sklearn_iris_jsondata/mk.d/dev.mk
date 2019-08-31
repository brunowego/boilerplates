SHELL := /bin/sh

MODEL_NAME := IrisClassifier
API_TYPE := REST
SELDON_PID := $(shell lsof -ti :5000)

.DEFAULT_GOAL := dev/run

.PHONY: dev/install
dev/install:
	@pip install \
		-r requirements-dev.txt \
		-r requirements.txt

.PHONY: dev/train
dev/train:
	@python ./train.py

.PHONY: dev/run
dev/run: dev/stop
	@seldon-core-microservice ${MODEL_NAME} ${API_TYPE}

.PHONY: dev/test
dev/test:
	@seldon-core-microservice-tester ./contract.json 0.0.0.0 5000 -p

.PHONY: dev/stop
dev/stop:
	@if [ ! -z "${SELDON_PID}" ]; then \
		kill -s TERM ${SELDON_PID}; \
	fi
