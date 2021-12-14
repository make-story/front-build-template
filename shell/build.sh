#!/bin/bash

# 젠킨스를 통한 프론트리소스 빌드 쉘스크립트
# $ sh shell/build.sh <Git 브랜치명> <젠킨스 프론트리소스 빌드 번호>
# $ sh shell/build.sh $GIT_BRANCH $BUILD_NUMBER
# $ sh shell/build.sh 'master' '빌드번호'

#SHELL_PATH=`pwd -P`
PROJECT_PATH="/usr/src/project"
PROJECT_NAME="makestory"

echo "Node.js 버전"
node -v
# which는 특정명령어의 위치를 찾아주는 명령어
which node
# whereis는 명령어의 실행파일위치, 소스위치, man 페이지파일의 위치를 찾아주는 명령어
#whereis node

# $1, $2 사용자 입력값 존재여부 확인
if [ -n "$1" ] && [ -n "$2" ];
	then

	# "env"
	export BUILD_NUMBER=$2 # '/빌드번호/빌드결과' 형태로 경로 생성
	if [ "develop" == "$1" ] || [ "origin/develop" == "$1" ];
		then
		PROJECT_PATH=$PROJECT_PATH/$PROJECT_NAME.test
		source $PROJECT_PATH/env/test.env; 
	elif [ "master" == "$1" ] || [ "origin/master" == "$1" ];
		then
		PROJECT_PATH=$PROJECT_PATH/$PROJECT_NAME
		source $PROJECT_PATH/env/production.env;
	else 
		echo "Git 브랜치 조건확인이 필요합니다."
		exit;
	fi
	
	# "build"
	# 파일이나 디렉토리 존재여부 확인
	if [ ! -e "$PROJECT_PATH" ] ; 
		then
		cd $PROJECT_PATH;
		./node_modules/.bin/webpack --config ./webpack.config.js --mode production
	fi

	unset BUILD_NUMBER
else 
	echo "설정값 확인이 필요합니다."
fi
exit;