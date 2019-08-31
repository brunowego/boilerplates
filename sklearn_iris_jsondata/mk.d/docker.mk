SHELL := /bin/sh

S2I_BUILD_OPTS ?=
DOCKER_RUN_OPTS ?=
DOCKER_REPO := brunowego
DOCKER_IMAGE := sklearn-iris-jsondata
DOCKER_TAG := 0.1

.DEFAULT_GOAL := docker/build

.PHONY: docker/build
docker/build:
	@s2i build \
		. \
		brunowego/seldon-core-s2i-miniconda3:0.1 \
		${DOCKER_REPO}/${DOCKER_IMAGE}:${DOCKER_TAG} \
		${S2I_BUILD_OPTS} \
		--loglevel 1
	@$(MAKE) docker/clean

.PHONY: docker/run
docker/run:
	@docker run -d \
		${DOCKER_RUN_OPTS} \
		-p 5000:5000 \
		--name ${DOCKER_IMAGE} \
		--restart always \
		${DOCKER_REPO}/${DOCKER_IMAGE}:${DOCKER_TAG}

# .PHONY: docker/train
# docker/train:
# 	@docker exec -it ${DOCKER_IMAGE} python ./train.py

.PHONY: docker/status
docker/status:
	@docker ps -af "name=${DOCKER_IMAGE}"

.PHONY: docker/logs
docker/logs:
	@docker logs --details -f ${DOCKER_IMAGE}

.PHONY: docker/test
docker/test:
	@docker exec -it \
		${DOCKER_IMAGE} \
		seldon-core-microservice-tester \
			./contract.json 0.0.0.0 5000 -p

.PHONY: docker/remove
docker/remove:
	@docker rm -f ${DOCKER_IMAGE}

.PHONY: docker/push
docker/push:
	@docker push ${DOCKER_REPO}/${DOCKER_IMAGE}:${DOCKER_TAG}

.PHONY: docker/clean
docker/clean:
	@docker image prune -f
