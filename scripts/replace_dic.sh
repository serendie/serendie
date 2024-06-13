#!bin/bash

# cd project root
cd $(git rev-parse --show-toplevel)

# Replace dic to sd

rg -w -l -g '!*.sh' 'dic' | xargs perl -pi -e 's/\bdic\b/sd/g' 

# Spread to Serendie

rg  -l -g "!*.sh" "Spread" | xargs perl -pi -e 's/\bSpread/Serendie/g'
rg  -w -l -g "!*.sh" "@spread" | xargs perl -pi -e 's/\@spread/\@serendie/g'
rg  -w -l -g "!*.sh" "spread-module" | xargs perl -pi -e 's/\bspread-module\b/\serendie-module/g'
rg  -l -g "!*.sh" "spreadTokens" | xargs perl -pi -e 's/\bspreadTokens\b/serendieTokens/g'
perl -pi -e 's/\bspread\b/serendie/g' package.json
