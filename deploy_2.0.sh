#!/bin/bash
set -e

destination="paul@paulbiberstein.me:~/Production/PersonalWebsite/"

# copy specified directory
rsync -razzvhP ~/Development/PersonalWebsite/website2.0/build/ "$destination"
# copy resources
# rsync -razzvhP ~/Development/PersonalWebsite/resources "$destination/"
# copy sitemap
# rsync -azzvhP ~/Development/PersonalWebsite/sitemap "$destination/sitemap"
# copy scripts
# rsync -azzvhP ~/Development/PersonalWebsite/sync_to_webroot.sh "$destination/sync_to_webroot.sh"