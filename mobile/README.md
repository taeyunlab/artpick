# ARTPICK Mobile (iOS & Android)

ARTPICK 신진 예술가 큐레이션 및 창작 아카이브 모바일 앱 (React Native / Expo)

## 📱 주요 구현 기능 (iOS & Android)

1. **홈 큐레이션 피드 (`HomeScreen`)**
   - 상단 헤더: ARTPICK 로고, 검색창, 신진 작가 등록 버튼
   - 카테고리 칩: 전체, 회화, 공예, 디지털 아트, 조소, 창작 일지 필터링
   - 이 주의 주목할 신진 작가: 이서윤 작가 스포트라이트 배너 & 프로필 연결
   - 📖 창작의 과정 (Story): 가로 스크롤 카드 덱 및 스토리 모달
   - 🎨 실시간 작품 큐레이션: 작가 미니 헤더(+팔로우), 작품 카드, 찜하기(Heart)

2. **작가 프로필 & 아카이브 (`ArtistProfileScreen`)**
   - 커버 이미지, 원형 아바타, 실시간 팔로우/언팔로우 토글
   - 팔로워, 작품 수, 전시 수 통계 카운터
   - 4개 탭: [작품 그리드], [창작일지], [소개], [전시 이력]

3. **iOS Sheet 모달 컴포넌트**
   - **창작 스토리 모달 (`StoryModal`)**: 4단계 제작 과정(스케치, 1차 채색, 텍스처링, 바니시) 타임라인, 재료 칩, 작가 노트
   - **작품 상세 모달 (`ArtworkDetailModal`)**: 고화질 뷰어, 규격/기법/연도 사양, 작가 프로필 바로가기, 하단 찜하기 + 소장/구매 문의 액션 바

4. **네이티브 내비게이션 & iOS Safe Area**
   - iOS 스타일 하단 플로팅 캡슐 탭 바 (홈, 탐색, 관심작품, 마이페이지)
   - Dynamic Island 및 iPhone 하단 홈 인디케이터 Safe Area 완벽 대응

---

## 🚀 실행 및 테스트 방법

### 1. 아이폰(iOS) 실제 기기에서 즉시 확인 (Expo Go)
1. iPhone App Store에서 **Expo Go** 앱을 다운로드합니다.
2. 터미널에서 다음 명령어를 실행합니다:
   ```bash
   cd mobile
   npm start
   ```
3. 터미널에 나타난 **QR 코드**를 iPhone 기본 카메라로 스캔하면 Expo Go에서 앱이 즉시 실행됩니다.

### 2. 웹 브라우저에서 프리뷰
```bash
cd mobile
npm run web
```

### 3. iOS App Store 배포 빌드 (EAS Build)
```bash
npx eas build -p ios
```
