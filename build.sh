#!/bin/bash

pushd client
npm run build
popd

pushd server
./mvnw clean install -DskipTests
popd
