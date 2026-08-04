#!/bin/bash

# maven process-classess will first generate dto.d.ts which is required by the front end build.
pushd server
./mvnw clean
./mvnw process-classes
popd

# build front end static assets (needs dto.d.ts).
pushd client
if [ "$1" == "ci" ]; then
	npm ci
fi
npm run build
popd

# build the jar which also packages the static front end assets.
pushd server
./mvnw install -DskipTests
popd
