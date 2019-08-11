workflow "Build and Publish" {
  on = "push"
  resolves = "Publish"
}

action "Build" {
  uses = "actions/docker/cli@master"
  args = "build -t streaminghell/telegram-bot ."
}

action "Publish Filter" {
  needs = ["Build"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Login" {
  needs = ["Publish Filter"]
  uses = "actions/docker/login@master"
  secrets = [
    "DOCKER_USERNAME",
    "DOCKER_PASSWORD",
  ]
}

action "Publish" {
  needs = ["Login"]
  uses = "actions/docker/cli@master"
  args = "push streaminghell/telegram-bot"
}
