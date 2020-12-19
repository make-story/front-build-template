# Git Hook 테스트 코드 (위치: Git프로젝트폴더/hooks/스크립트생성)

cat << EOF > ./test.git/hooks/post-receive
#!/bin/sh

# git checkout [<options>] <branch>
#  -f, --force           force checkout (throw away local modifications)

#후크는 <oldrev> <newrev> <refname> 형식으로 stdin에서 인수를 가져옵니다. 
while read oldrev newrev refname
do
branch=\$(git rev-parse --symbolic --abbrev-ref \$refname)
echo \$branch
if [ "master" == "\$branch" ]; then
    GIT_WORK_TREE=/Users/sung-minyu/Development/github/webpagetest.git/shell/$PROJECT git checkout -f \$branch
    chmod -R 775 /Users/sung-minyu/Development/github/webpagetest.git/shell/$PROJECT/
    echo 'changes pushed to \$branch'
fi

if [ "develop" == "\$branch" ]; then
    GIT_WORK_TREE=/Users/sung-minyu/Development/github/webpagetest.git/shell/$PROJECT.test git checkout -f \$branch
    chmod -R 775 /Users/sung-minyu/Development/github/webpagetest.git/shell/$PROJECT.test/
    echo 'changes pushed to \$branch'
fi
done
EOF

chmod 755 ./test.git/hooks/post-receive