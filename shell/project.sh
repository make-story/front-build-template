#!/bin/bash

ROOT_PATH="/Users/sung-minyu/Development/github/webpagetest.git/shell"
PROJECT_NAME=$1
if [ -n "$PROJECT_NAME" ] && [ ! -d "$PROJECT_NAME" ] && [ ! -d "$PROJECT_NAME".test ] && [ ! -d "$PROJECT_NAME".git ]; 
    then
    # 서비스 폴더 생성 (non-bare Storage)
    mkdir "$PROJECT_NAME"
    if [ -d "$PROJECT_NAME" ];
        then
        echo "$PROJECT_NAME" master folder 
        cd "$PROJECT_NAME"
        git init
        git add .
        git commit
        cd ../
    fi
    mkdir "$PROJECT_NAME".test
    if [ -d "$PROJECT_NAME".test ];
        then
        echo "$PROJECT_NAME".test develop folder
        cd "$PROJECT_NAME".test
        git init
        git add .
        git commit
        cd ../
    fi

    # Git set-up
    # bare repo 라고 불리는 이 저장소에는 실제 작업되는 파일, 디렉토리가 저장되는 것이 아닌 변경사항, 이력 등의 revision history 정보들을 저장
    # 즉, 히스토리 관리 및 공유하기 위한 목적으로 bare repo 를 생성. 다수의 작업자, 프로젝트 참가자의 변경 사항을 공통으로 관리하기 위한 저장소로 사용
    # --shared 옵션을 붙이는 것이 Git으로 자동으로 그룹 쓰기 권한을 추가하는 방법 (쓰기 권한까지 가지고 있으면 SSH로 접근할 수 있는 사용자는 바로 Push 할 수 있습니다.)
    git init --bare --shared "$PROJECT_NAME".git

    # 원격저장소 설정 (Git 커밋 파일이 실제 적용될 곳 연결)
    if [ -d "$PROJECT_NAME" ];
        then
        echo "$PROJECT_NAME" master remote 
        cd "$PROJECT_NAME"
        git remote add orign ../"$PROJECT_NAME".git
        git remote -v
        cd ../
    fi
    if [ -d "$PROJECT_NAME".test ];
        then
        echo "$PROJECT_NAME".test develop remote
        cd "$PROJECT_NAME".test
        git remote add orign ../"$PROJECT_NAME".git
        git remote -v
        cd ../
    fi

    # Git Hooks
    if [ -d "$PROJECT_NAME".git ];
        then
        cd "$PROJECT_NAME".git
cat << EOF > ./hooks/post-receive
#!/bin/sh

# git checkout [<options>] <branch>
#  -f, --force           force checkout (throw away local modifications)

#후크는 <oldrev> <newrev> <refname> 형식으로 stdin에서 인수를 가져옵니다. 
while read oldrev newrev refname
do
    branch=\$(git rev-parse --symbolic --abbrev-ref \$refname)
    echo \$branch
    if [ "master" == "\$branch" ]; then
        GIT_WORK_TREE=$ROOT_PATH/$PROJECT_NAME git checkout -f \$branch
        chmod -R 775 $ROOT_PATH/$PROJECT_NAME/
        echo 'changes pushed to \$branch'
    fi

    if [ "develop" == "\$branch" ]; then
        GIT_WORK_TREE=$ROOT_PATH/$PROJECT_NAME.test git checkout -f \$branch
        chmod -R 775 $ROOT_PATH/$PROJECT_NAME.test/
        echo 'changes pushed to \$branch'
    fi
done
EOF
        # 'hook was ignored because it's not set as executable.'
        # 폴더 접근 권한 수정 (git hook 실행 가능하도록 한다.)
        chmod 755 ./hooks/post-receive

        #touch README.md
        #git add README.md
        #git commit m "프로젝트 생성"

        echo "$PROJECT_NAME - 프로젝트 GIT 경로"
        pwd
        cd ../
    fi
else
    echo "프로젝트명 확인이 필요합니다."
fi