SHELL := /bin/sh

.DEFAULT_GOAL := jupyter/run

.PHONY: jupyter/kernel
jupyter/kernel:
	@ipython kernel install \
		--name .venv \
		--sys-prefix

.PHONY: jupyter/run
jupyter/run:
	@jupyter notebook

.PHONY: jupyter/stop
jupyter/stop:
	@jupyter notebook stop
