#!/usr/bin/env bash
# Preview the site as GitHub Pages will build it, at http://localhost:4000
# Runs GitHub's own Pages build image through Docker, so only Docker needs installing.
# It rebuilds when you save a file; refresh the browser to see changes. Ctrl+C stops it.
#   ./preview.sh           build and serve
#   ./preview.sh --drafts  also show posts in _drafts/
set -euo pipefail

cd "$(dirname "$0")"

image="ghcr.io/actions/jekyll-build-pages:v1.0.13"
port="${PORT:-4000}"

echo "Previewing at http://localhost:${port}/devlog/"

# The source must sit under /github/workspace: Jekyll's safe mode refuses includes from other paths.
docker run --rm -t \
  -u "$(id -u):$(id -g)" \
  -p "${port}:4000" \
  -v "$PWD":/github/workspace/src:ro \
  --entrypoint bash \
  "$image" \
  -c "cd / && exec bundle exec jekyll serve --source /github/workspace/src --destination /tmp/_site --host 0.0.0.0 --port 4000 --force_polling $*"
