#!/bin/bash
 
# 젠킨스 또는 Crontab(크론탭, 스케줄링) 실행가능한 UI테스트 실행명령 쉘스크립트
# $ sh shell/uitest.sh <node 실행파일 전달 파라미터>

#SHELL_PATH=`pwd -P`
SHELL_PATH="/Users/ysm0203/Development/node/webpagetest.git"
node $SHELL_PATH/headlesschrome/uitest.js $@