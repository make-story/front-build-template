#!/bin/sh

# webpagetest
# 0 */3 * * * /home/front/crontab/webpagetest.sh > /home/front/crontab/webpagetest.sh.log 2>&1

cd /home/front/webpagetest
#yarn webpagetest
node webpage.js
exit;