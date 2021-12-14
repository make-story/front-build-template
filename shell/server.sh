#!/bin/bash

# 젠킨스를 통한 node.js 서버 재시작 쉘스크립트
# $ sh shell/server.sh <Git 브랜치명> <젠킨스 프론트리소스 빌드 번호>
# $ sh shell/server.sh $GIT_BRANCH $BUILD
# $ sh shell/server.sh 'master' '빌드번호'

# $ ps -ef | grep pm2
# $ ps -ef | grep node
# $ kill -9 <PID>

#SHELL_PATH=`pwd -P`
PROJECT_PATH="/Users/sung-minyu/Development/github"
PROJECT_NAME="webpagetest"
APP_NAME="WebPagetest"
SOCKET_NAME="WebPagetest-socket"
if [ -n "$1" ];
    then

    # "env"
    export BUILD_NUMBER=$2 # '/빌드번호/빌드결과' 빌드결과물 바라보도록 서버 실행
    if [ "develop" == "$1" ] || [ "origin/develop" == "$1" ];
        then
        PROJECT_PATH=$PROJECT_PATH/$PROJECT_NAME.test
        APP_NAME=$APP_NAME-develop
        SOCKET_NAME=$SOCKET_NAME-develop
        echo "test.env"
        source $PROJECT_PATH/env/test.env; 
    elif [ "master" == "$1" ] || [ "origin/master" == "$1" ];
        then
        PROJECT_PATH=$PROJECT_PATH/$PROJECT_NAME
        APP_NAME=$APP_NAME-master
        SOCKET_NAME=$SOCKET_NAME-master
        echo "production.env"
        source $PROJECT_PATH/env/production.env;
    else 
        echo "Git 브랜치 조건확인이 필요합니다."
        exit;
    fi

    # "node process"
    #PID=`ps -ef | grep -v 'grep' | grep 'node' | grep '/Users/ysm0203/Development/node/webpagetest.git/servers/main.js' | awk '{print $2}'`
    #if [ -n "$PID" ];
    #	then
    	# "kill -9 프로세스 ID로 프로세스 중지."
    	# "ps -ef 프로세스 전체출력."
    	# "grep 'PROCESS_NAME' 프로세스 이름 검색."
    	# "awk '{print $2}' 위에서 검색된 줄에서 2번째 항목(PID) 출력."
    #	kill -9 "$PID"
    #fi
    PM2=`$PROJECT_PATH/node_modules/pm2/bin/pm2 list | grep "$APP_NAME" | awk '{print $4}'`
    if [ -n "$PM2" ];
	    then
        echo "$APP_NAME Stop!"
        $PROJECT_PATH/node_modules/pm2/bin/pm2 delete "$PM2"
    fi
    PM2=`$PROJECT_PATH/node_modules/pm2/bin/pm2 list | grep "$SOCKET_NAME" | awk '{print $4}'`
    if [ -n "$PM2" ];
	    then
        echo "$SOCKET_NAME Stop!"
        $PROJECT_PATH/node_modules/pm2/bin/pm2 delete "$PM2"
    fi

    # "node start"
    #BUILD_ID=dontKillMe ACTIVE=test BUILD_NUMBER=${BUILD} nohup node servers/main.js &
    echo "$APP_NAME Start!"
    $PROJECT_PATH/node_modules/pm2/bin/pm2 start $PROJECT_PATH/servers/main.js --name "$APP_NAME"
    echo "$SOCKET_NAME Start!"
    $PROJECT_PATH/node_modules/pm2/bin/pm2 start $PROJECT_PATH/servers/websocket.js --name "$SOCKET_NAME"
    unset BUILD_NUMBER

    # pm2 list 확인
    $PROJECT_PATH/node_modules/pm2/bin/pm2 list
else 
    echo "설정값 확인이 필요합니다."
fi
exit;