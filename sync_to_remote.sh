#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Please specify which website directory to copy over"
    exit 1
fi
# quit if any command fails
set -e

destination="paul@paulbiberstein.me:~/Development/PersonalWebsite"

# copy specified directory
rsync -razzvhP --exclude 'node_modules' "$1/" "$destination"
# copy resources
rsync -azzvhP ~/Development/PersonalWebsite/resources "$destination/resources"
# copy sitemap
rsync -azzvhP ~/Development/PersonalWebsite/sitemap "$destination/sitemap"
# copy scripts
rsync -azzvhP ~/Development/PersonalWebsite/sync_to_webroot.sh "$destination/sync_to_webroot.sh"