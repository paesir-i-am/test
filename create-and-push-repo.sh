#!/bin/bash

# GitHub 레포지토리 자동 생성 및 푸시 스크립트

set -e

REPO_NAME="sharingCar"
CURRENT_DIR="/Users/paesir/Desktop/test"

cd "$CURRENT_DIR"

echo "🚀 GitHub 레포지토리 생성 및 푸시 시작..."
echo ""

# GitHub CLI 인증 확인
if ! gh auth status &>/dev/null; then
  echo "⚠️  GitHub CLI 인증이 필요합니다."
  echo ""
  echo "인증 방법:"
  echo "1. 아래 명령어를 실행하세요:"
  echo "   gh auth login"
  echo ""
  echo "2. 또는 Personal Access Token을 사용하세요:"
  echo "   gh auth login --with-token < token.txt"
  echo ""
  echo "3. 또는 이 스크립트를 실행하기 전에:"
  echo "   export GITHUB_TOKEN=your_token_here"
  echo ""
  
  # 환경 변수에서 토큰 확인
  if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GitHub 인증이 필요합니다. 위 방법 중 하나를 선택해주세요."
    exit 1
  else
    echo "✅ GITHUB_TOKEN 환경 변수를 사용합니다."
    echo "$GITHUB_TOKEN" | gh auth login --with-token
  fi
fi

echo "✅ GitHub 인증 완료"
echo ""

# 기존 원격 저장소 제거 (있는 경우)
if git remote get-url origin &>/dev/null; then
  echo "📝 기존 원격 저장소 제거 중..."
  git remote remove origin
fi

# 레포지토리 생성
echo "📦 GitHub 레포지토리 생성 중: $REPO_NAME"
gh repo create "$REPO_NAME" --public --source=. --remote=origin --description "중고차 판매 플랫폼 쑤카" || {
  echo "⚠️  레포지토리가 이미 존재할 수 있습니다. 푸시만 진행합니다..."
  if ! git remote get-url origin &>/dev/null; then
    GITHUB_USER=$(gh api user --jq .login)
    git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
  fi
}

# 메인 브랜치 확인
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "📝 브랜치를 main으로 변경 중..."
  git branch -M main
fi

# 푸시
echo "📤 GitHub에 푸시 중..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ 성공적으로 GitHub에 업로드되었습니다!"
  REPO_URL=$(git remote get-url origin | sed 's/\.git$//' | sed 's/git@github.com:/https:\/\/github.com\//')
  echo "📋 레포지토리 URL: $REPO_URL"
  echo ""
  echo "브라우저에서 확인하세요: $REPO_URL"
else
  echo ""
  echo "❌ 푸시 실패. 다시 시도해주세요."
  exit 1
fi

