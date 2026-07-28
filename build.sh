#!/bin/bash

pushd server
./mvnw clean
./mvnw process-classes
popd

pushd client
npm run build
popd

pushd server
./mvnw install -DskipTests
popd
