#!/bin/bash

pushd server
./mvnw clean process-classes
popd

pushd client
npm run build
popd

pushd server
./mvnw clean install -DskipTests
popd
