#!/bin/bash

pushd server
./mvnw clean
./mvnw process-classes
popd

pushd client
if [ "$1" == "ci" ]; then
  npm ci
fi
npm run build
popd

pushd server
./mvnw install -DskipTests
popd
