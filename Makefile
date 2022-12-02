.PHONY: preview-docs
preview-docs: ## Preview tech-docs
	@docker run --rm -i -v ${PWD}:/app -w /app -p 3000:3000 806120774687.dkr.ecr.us-east-1.amazonaws.com/contentful/tech-docs-cli \
    serve --verbose --no-docker

help: ## Show help
	@echo "# Makefile Help #"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
