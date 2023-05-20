terraform {
  backend "local" {}
}

resource "bytebase_environment" "dev" {
  resource_id             = "dev"
  title                   = "Dev"
  order                   = 0
  environment_tier_policy = "UNPROTECTED"
}

resource "bytebase_environment" "test" {
  resource_id             = "test"
  title                   = "Test"
  order                   = 1
  environment_tier_policy = "UNPROTECTED"
}

resource "bytebase_environment" "prod" {
  resource_id             = "prod"
  title                   = "Prod"
  order                   = 2
  environment_tier_policy = "UNPROTECTED"
}

resource "bytebase_instance" "dev" {
  resource_id = "dev"
  environment = bytebase_environment.dev.resource_id
  title       = "Postgres Dev Instance"
  engine      = "POSTGRES"

  data_sources {
    title    = "Admin Data Source"
    type     = "ADMIN"
    username = "dev"
    password = "dev"
    host     = "postgres-dev"
    port     = 5432
  }
}

resource "bytebase_instance" "test" {
  resource_id = "test"
  environment = bytebase_environment.test.resource_id
  title       = "Postgres Test Instance"
  engine      = "POSTGRES"

  data_sources {
    title    = "Admin Data Source"
    type     = "ADMIN"
    username = "test"
    password = "test"
    host     = "postgres-test"
    port     = 5432
  }
}

resource "bytebase_instance" "prod" {
  resource_id = "prod"
  environment = bytebase_environment.prod.resource_id
  title       = "Postgres Prod Instance"
  engine      = "POSTGRES"

  data_sources {
    title    = "Admin Data Source"
    type     = "ADMIN"
    username = "prod"
    password = "prod"
    host     = "postgres-prod"
    port     = 5432
  }
}
