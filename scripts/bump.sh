#!/bin/bash

LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
VERSION=${LATEST_TAG#v}

IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"

if [[ "$1" == "major" ]]; then
  ((MAJOR++))
  MINOR=0
  PATCH=0
elif [[ "$1" == "minor" ]]; then
  ((MINOR++))
  PATCH=0
elif [[ "$1" == "patch" ]]; then
  ((PATCH++))
else
  echo "Usage: $0 {major|minor|patch}"
  exit 1
fi

NEW_VERSION="v$MAJOR.$MINOR.$PATCH"

echo "Updating version to $NEW_VERSION"

# Update manifest.chrome.json (Chromium)
jq --arg new_version "$MAJOR.$MINOR.$PATCH" '.version = $new_version' manifest.chrome.json > tmp.json && mv tmp.json manifest.chrome.json

# Update manifest.firefox.json
jq --arg new_version "$MAJOR.$MINOR.$PATCH" '.version = $new_version' manifest.firefox.json > tmp.json && mv tmp.json manifest.firefox.json

# Update package.json
jq --arg new_version "$MAJOR.$MINOR.$PATCH" '.version = $new_version' package.json > tmp.json && mv tmp.json package.json

npm i --package-lock-only

git add manifest.chrome.json manifest.firefox.json package.json package-lock.json 2>/dev/null
git commit -m "Release $NEW_VERSION"
git tag "$NEW_VERSION"

echo "New version tagged: $NEW_VERSION"
