# 상품 관리 시스템

Next.js와 TypeScript로 구현한 상품 관리 시스템입니다. React Query를 활용한 서버 상태 관리와 재사용 가능한 컴포넌트 아키텍처를 적용했습니다.

## 기능

- 상품 목록 조회 (리스트/그리드 뷰)
- 새 상품 등록
- 폼 유효성 검사
- 서버사이드 렌더링 (SSR)
- 반응형 디자인
- 통합된 폼 필드 컴포넌트 시스템

## 기술 스택

- **Framework**: Next.js 15 (Pages Router) with Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack React Query v5
- **HTTP Client**: Axios

## 실행 방법

```bash
# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행 (Turbopack 활성화)
npm run dev
# 또는
yarn dev

# 빌드
npm run build
# 또는
yarn build

# 프로덕션 실행
npm run start
# 또는
yarn start
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 개발 계획 및 설계 과정

## 주요 고려 사항 및 해결 과정

## 프로젝트 구조

```
src/
├── components/
│   ├── common/          # 재사용 가능한 공통 컴포넌트
│   │   ├── Layout.tsx   # 페이지 레이아웃
│   │   ├── Header.tsx   # 페이지 헤더
│   │   └── Button.tsx   # 재사용 가능한 버튼
│   ├── form/           # 폼 관련 컴포넌트
│   │   └── FormField.tsx # 통합 폼 필드 시스템
│   └── product/        # 상품 관련 컴포넌트
├── hooks/              # 커스텀 훅
├── libs/
│   ├── apis/          # API 함수들
│   └── utils/         # 유틸리티 함수들
├── pages/             # Next.js 페이지
├── styles/            # 스타일 파일
└── types/             # TypeScript 타입 정의
```

## 배운 점
