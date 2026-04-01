This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

----------------------------------------------------------------------------------------------------------------------------------------

### 💻 Tech Stack & Libraries
이 프로젝트는 최신 프론트엔드 생태계와 서버리스 백엔드를 결합하여 빠르고 안정적인 사용자 경험을 제공하도록 구축되었습니다.

## 1. Framework & Language
Next.js (v16.1) & React 19: App Router를 기반으로 한 서버/클라이언트 렌더링 최적화와 최신 React 생태계의 동시성(Concurrency) 기능을 활용하기 위해 사용했습니다.

TypeScript: 정적 타입 검사를 통해 런타임 에러를 방지하고, 코드의 가독성과 유지보수성을 높이기 위해 채택했습니다.

## 2. Backend & Authentication
Convex: 별도의 서버 구축 없이 실시간 데이터베이스(Real-time DB)와 백엔드 API를 Next.js와 매끄럽게 연동하기 위해 도입했습니다 (@convex-dev/presence를 통한 실시간 상태 관리 포함).

Better Auth: 복잡한 인증 로직을 최소화하면서도, Convex와 연동하여 안전하고 타입 세이프(Type-safe)한 회원가입/로그인 흐름을 구현하기 위해 사용했습니다.

## 3. Styling & UI Components
Tailwind CSS (v4): 유틸리티 클래스 기반으로 빠르고 일관성 있게 반응형 디자인과 스타일링을 적용하기 위해 사용했습니다.

Shadcn UI & Radix UI: 접근성(a11y)이 뛰어나고 커스터마이징이 자유로운 Headless UI 컴포넌트를 기반으로, 프로젝트만의 디자인 시스템을 구축하기 위해 채택했습니다. (class-variance-authority, tailwind-merge, clsx 등 활용)

Lucide React: 깔끔하고 가벼운 SVG 아이콘을 일관되게 적용하기 위해 사용했습니다.

Next Themes: 다크 모드와 라이트 모드 간의 전환을 깜빡임(FOUC) 없이 자연스럽게 구현하기 위해 도입했습니다.

Sonner: 사용자 동작에 대한 즉각적이고 세련된 토스트(Toast) 알림 UI를 제공하기 위해 사용했습니다.

## 4. Form & Validation
React Hook Form: 폼(Form) 상태 관리 시 불필요한 리렌더링을 방지하고 성능을 최적화하기 위해 도입했습니다.

Zod: 스키마 기반으로 입력 데이터를 강력하게 검증하고, TypeScript 타입 추론을 통해 안전한 폼 데이터 처리를 구현하기 위해 react-hook-form과 함께 (@hookform/resolvers) 사용했습니다.
