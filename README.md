# Next.js 16 Turborepo Template

프로덕션 준비가 완료된 Next.js 16 + Turborepo 보일러플레이트입니다.

## ✨ 주요 기능

### 🏗️ 아키텍처
- **[Next.js 16.1.6](https://nextjs.org/)** - React 프레임워크 (Turbopack 포함)
- **[React 19.0.0](https://react.dev/)** - 최신 React
- **[Turborepo 2.8.4](https://turbo.build/repo)** - 고성능 모노레포 빌드 시스템
- **[pnpm 10.29.2](https://pnpm.io/)** - 빠른 패키지 매니저 (workspace + catalog)
- **Node.js >= 22.17.0** - JavaScript 런타임

### 🎨 UI/스타일링
- **[Tailwind CSS 4.1.18](https://tailwindcss.com/)** - 유틸리티 우선 CSS 프레임워크
- **[shadcn/ui](https://ui.shadcn.com/)** - 재사용 가능한 컴포넌트 라이브러리
- **[CVA 0.7.1](https://cva.style/)** - Class Variance Authority (variants 관리)
- **[Radix UI](https://www.radix-ui.com/)** - 접근성 우선 컴포넌트
  - react-accordion: 1.2.12
  - react-slot: 1.2.4
- **[Lucide React 0.563.0](https://lucide.dev/)** - 아이콘 라이브러리

### 🔧 개발 도구
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - 타입 안정성
- **[ESLint 9.39.2](https://eslint.org/)** - Flat Config로 설정된 린터
- **[Prettier 3.8.1](https://prettier.io/)** - 코드 포맷터
- **[Husky 9.1.7](https://typicode.github.io/husky/)** - Git hooks
- **[Commitlint 20.4.1](https://commitlint.js.org/)** - 커밋 메시지 검증

### ⚡ 최적화
- **Tree-shaking** - 사용하지 않는 코드 자동 제거
- **Import Order** - 자동 import 정렬
- **Bundle Analyzer** - 번들 사이즈 분석 (`ANALYZE=true pnpm build`)

## 📁 프로젝트 구조

```
.
├── apps
│   └── web                 # Next.js 애플리케이션
│       ├── app/           # App Router
│       ├── public/        # 정적 파일
│       └── eslint.config.js
├── packages
│   ├── ui                 # UI 컴포넌트 패키지
│   │   ├── src/
│   │   │   ├── components/  # shadcn/ui 컴포넌트
│   │   │   ├── lib/         # 유틸리티
│   │   │   └── globals.css  # 글로벌 스타일
│   │   ├── rollup.config.js
│   │   └── package.json
│   ├── eslint-config      # ESLint 설정 (Flat Config)
│   │   ├── library.js
│   │   ├── next.js
│   │   ├── react-internal.js
│   │   └── import-order.js
│   └── typescript-config  # TypeScript 설정
│       ├── base.json
│       ├── nextjs.json
│       └── react-library.json
├── .vscode
│   └── settings.json      # VSCode 설정
├── pnpm-workspace.yaml    # pnpm workspace 설정
└── turbo.json             # Turborepo 설정
```

## 🚀 시작하기

### 필수 요구사항

- **Node.js** >= 22.17.0
- **pnpm** 10.29.2

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발

```bash
# 전체 개발 서버 시작
pnpm dev

# 특정 앱만 실행
pnpm web dev

# UI 패키지 watch 모드
pnpm ui dev
```

### 빌드

```bash
# 전체 빌드
pnpm build

# 특정 앱만 빌드
pnpm web build

# 번들 분석과 함께 빌드
ANALYZE=true pnpm web build
```

### 린트

```bash
# 전체 프로젝트 lint
pnpm lint

# 자동 수정
pnpm lint --fix

# 특정 패키지만 lint
pnpm web lint
pnpm ui lint
```

### 포맷

```bash
# Prettier로 코드 포맷팅
pnpm format
```

## 🎨 UI 컴포넌트

### shadcn/ui 컴포넌트 추가

```bash
# UI 패키지에 새 컴포넌트 추가
pnpm ui:shadcn add [component-name]

# 예시
pnpm ui:shadcn add dialog
pnpm ui:shadcn add card
```

### 컴포넌트 사용

```tsx
import { Button } from '@repo/ui';

export default function Page() {
  return (
    <Button variant="default">
      Click me
    </Button>
  );
}
```

### 사용 가능한 variants

**Button:**
- `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`

**Size:**
- `default` | `sm` | `lg` | `icon`

## 🔧 설정

### ESLint (Flat Config)

ESLint 9의 Flat Config를 사용합니다:

**Import Order 규칙:**
1. React/Next 패키지 (`react`, `next`)
2. 외부 @ 패키지 (`@radix-ui`, `@tanstack`)
3. 외부 패키지 (`class-variance-authority`)
4. 내부 alias (`@/lib/utils`, `~/components`)
5. 상위 디렉토리 (`../parent`)
6. 현재 디렉토리 (`./current`)
7. CSS 파일 (`styles.css`)

**자동 정렬:**
```bash
pnpm lint --fix
```

### VSCode

**CVA에서 Tailwind 자동완성:**

`.vscode/settings.json`에 설정되어 있습니다:
```json
{
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### pnpm Catalog

중앙 집중식 의존성 관리를 위해 pnpm catalog를 사용합니다:

```yaml
# pnpm-workspace.yaml
catalog:
  # 프레임워크
  next: 16.1.6
  react: ^19.0.0
  react-dom: ^19.0.0

  # 스타일링
  tailwindcss: ^4.1.18
  '@tailwindcss/postcss': ^4.1.18
  lucide-react: ^0.563.0
  'class-variance-authority': ^0.7.1
  'tailwind-merge': ^3.4.0

  # 개발 도구
  typescript: ^5.9.3
  eslint: ^9.39.2
  prettier: ^3.8.1

  # Radix UI
  '@radix-ui/react-accordion': ^1.2.12
  '@radix-ui/react-slot': ^1.2.4
```

패키지에서 사용:
```json
{
  "dependencies": {
    "next": "catalog:",
    "react": "catalog:"
  }
}
```

## 📦 패키지 설명

### @repo/ui

UI 컴포넌트를 관리하는 공유 패키지입니다.

**특징:**
- **[Rollup 4.57.1](https://rollupjs.org/)** - 번들러
- Tree-shaking 지원 (`sideEffects: false`)
- TypeScript 타입 선언 포함
- shadcn/ui 컴포넌트

**Exports:**
```json
{
  ".": "./dist/index.js",
  "./styles.css": "./src/globals.css",
  "./tailwind.config": "./tailwind.config.ts"
}
```

### @repo/eslint-config

ESLint Flat Config 설정을 공유합니다.

**설정:**
- `library.js` - 라이브러리용
- `next.js` - Next.js 앱용
- `react-internal.js` - React 내부 패키지용
- `import-order.js` - Import 정렬 규칙

### @repo/typescript-config

TypeScript 설정을 공유합니다.

**설정:**
- `base.json` - 기본 설정
- `nextjs.json` - Next.js용
- `react-library.json` - React 라이브러리용

## 🎯 최적화

### Tree-shaking

사용하지 않는 컴포넌트는 자동으로 번들에서 제외됩니다:

```tsx
// Button만 import하면 Accordion은 번들에 포함되지 않음
import { Button } from '@repo/ui';
```

### Bundle 분석

```bash
ANALYZE=true pnpm web build
```

브라우저에서 번들 크기를 시각화합니다.

## 📝 Git 커밋

### Commitlint

커밋 메시지는 Conventional Commits 규칙을 따릅니다:

```bash
# 올바른 형식
git commit -m "feat: 새로운 기능 추가"
git commit -m "fix: 버그 수정"
git commit -m "docs: 문서 업데이트"

# 타입
# feat, fix, docs, style, refactor, test, chore
```

### Husky

자동으로 다음을 실행합니다:
- pre-commit: lint 검사
- commit-msg: 커밋 메시지 검증

## 🔗 유용한 명령어

```bash
# 특정 패키지에서 명령 실행
pnpm --filter @repo/web [command]
pnpm --filter @repo/ui [command]

# 별칭 사용
pnpm web [command]
pnpm ui [command]

# shadcn 컴포넌트 추가
pnpm ui:shadcn add [component]

# 전체 정리 및 재설치
rm -rf node_modules packages/*/node_modules apps/*/node_modules
pnpm install
```

## 📚 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Turborepo 문서](https://turbo.build/repo/docs)
- [pnpm 문서](https://pnpm.io/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)

## 📄 라이선스

MIT
