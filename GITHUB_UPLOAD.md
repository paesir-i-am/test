# GitHub 업로드 가이드

## 현재 상태
- ✅ Git 저장소 초기화 완료
- ✅ 모든 파일 커밋 완료
- ⏳ GitHub 레포지토리 생성 필요

## GitHub 레포지토리 생성 방법

### 방법 1: GitHub 웹사이트에서 생성

1. **GitHub 접속**
   - https://github.com 접속
   - 로그인

2. **새 레포지토리 생성**
   - 우측 상단 "+" 버튼 클릭 → "New repository"
   - Repository name: `sharingCar`
   - Description: "중고차 판매 플랫폼 쑤카"
   - Public 또는 Private 선택
   - **중요**: "Initialize this repository with a README" 체크 해제
   - "Create repository" 클릭

3. **로컬 저장소에 원격 저장소 추가 및 푸시**
   ```bash
   cd /Users/paesir/Desktop/test
   git remote add origin https://github.com/YOUR_USERNAME/sharingCar.git
   git branch -M main
   git push -u origin main
   ```
   (YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경)

### 방법 2: SSH 사용 (권장)

1. **SSH 키 설정 확인** (이미 설정되어 있다면 생략)
   ```bash
   ls -la ~/.ssh
   ```

2. **GitHub에서 SSH URL 복사**
   - 레포지토리 생성 후 "SSH" 버튼 클릭
   - URL 예: `git@github.com:YOUR_USERNAME/sharingCar.git`

3. **원격 저장소 추가 및 푸시**
   ```bash
   cd /Users/paesir/Desktop/test
   git remote add origin git@github.com:YOUR_USERNAME/sharingCar.git
   git branch -M main
   git push -u origin main
   ```

## 자동 실행 스크립트

아래 명령어를 실행하면 자동으로 진행됩니다:

```bash
cd /Users/paesir/Desktop/test

# 원격 저장소 추가 (GitHub에서 생성한 후 URL을 넣어주세요)
git remote add origin https://github.com/YOUR_USERNAME/sharingCar.git

# 메인 브랜치로 설정
git branch -M main

# 푸시
git push -u origin main
```

## 확인 사항

업로드 전 확인:
- ✅ `.env` 파일이 제외되어 있는지 확인
- ✅ `prisma/dev.db` 파일이 제외되어 있는지 확인
- ✅ `node_modules` 폴더가 제외되어 있는지 확인

## 업로드 후

업로드 완료 후:
1. GitHub에서 레포지토리 확인
2. README.md가 제대로 표시되는지 확인
3. 필요한 경우 GitHub Actions 설정

