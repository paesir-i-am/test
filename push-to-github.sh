#!/bin/bash

# GitHub 레포지토리 푸시 스크립트
# 사용법: ./push-to-github.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
  echo "❌ GitHub 사용자명을 입력해주세요."
  echo "사용법: ./push-to-github.sh YOUR_GITHUB_USERNAME"
  exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="sharingCar"

echo "🚀 GitHub 레포지토리에 푸시 중..."

# 기존 원격 저장소 제거 (있는 경우)
git remote remove origin 2>/dev/null || true

# 원격 저장소 추가
git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git

# 메인 브랜치로 설정
git branch -M main

# 푸시
echo "📤 GitHub에 푸시 중..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo "✅ 성공적으로 GitHub에 업로드되었습니다!"
  echo "📋 레포지토리 URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
else
  echo "❌ 푸시 실패. GitHub 레포지토리가 생성되었는지 확인해주세요."
  echo ""
  echo "레포지토리 생성 방법:"
  echo "1. https://github.com/new 접속"
  echo "2. Repository name: ${REPO_NAME}"
  echo "3. Public 선택"
  echo "4. 'Initialize this repository with a README' 체크 해제"
  echo "5. 'Create repository' 클릭"
  echo ""
  echo "그 다음 이 스크립트를 다시 실행하세요."
fi

