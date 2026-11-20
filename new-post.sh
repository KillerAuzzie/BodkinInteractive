#!/usr/bin/env bash
# Start a new dev log post:  ./new-post.sh "Fishing is finally fun"
# Creates _posts/<today>-fishing-is-finally-fun.md from _templates/post.md and prints its path.
# Write it, then commit and push to main. GitHub Pages formats and publishes it.
set -euo pipefail

cd "$(dirname "$0")"

if [ $# -lt 1 ] || [ -z "$1" ]; then
  echo "Usage: ./new-post.sh \"Post title\"" >&2
  exit 1
fi

title="$1"
date="$(date +%Y-%m-%d)"
slug="$(printf '%s' "$title" | tr '[:upper:]' '[:lower:]' | sed -E "s/['’]//g; s/[^a-z0-9]+/-/g; s/^-+|-+$//g")"
file="_posts/${date}-${slug}.md"

if [ -e "$file" ]; then
  echo "Already exists: $file" >&2
  exit 1
fi

# Escape double quotes so the title is valid inside the front matter's "..."
TITLE="${title//\"/\\\"}" awk '/^title: "Your post title"$/ { print "title: \"" ENVIRON["TITLE"] "\""; next } { print }' \
  _templates/post.md > "$file"

echo "$file"
echo "Preview it with ./preview.sh, then publish with:"
echo "  git add \"$file\" Assets/img/devlog && git commit -m \"Dev log: $title\" && git push"
