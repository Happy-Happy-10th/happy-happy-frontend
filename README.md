## 스위프 10기 '요때요'

## 🎉 Tech Stack

| Category | PackageName |
| --- | --- |
| FE Framework | [`Next.js`](https://nextjs.org/) [`React`](https://ko.react.dev/) |
| Style / Animation | [`Tailwindcss`](https://tailwindcss.com/) [`Shadcn`](https://ui.shadcn.com/) [`Motion`](https://motion.dev/) |
| API / Fetch | [`React-Query`](https://tanstack.com/query/latest/docs/framework/react/overview) [`Ky`](https://github.com/sindresorhus/ky) |
| State Management | [`Zustand`](https://zustand-demo.pmnd.rs/) |

## ⚒️ Commit Message Convention

- feat: 새로운 기능 추가의 경우

- fix: 버그(긴급) 수정의 경우

- refactor: 리팩토링의 경우

- docs: 문서,주석 추가/수정의 경우

- chore: 빌드 업무 수정, 패키지매니저 수정의 경우

## ⚙️ Package Manager Version

```bash
yarn -v
1.22.22

node -v
v22.15.0
```

> 초기 버전이므로 변경될수있음.

## 📂 Folder Architecture

```bash
🗂️ src
┣ 📂 @mock // Mock Data
┣ 📂 @types // 타입 정의
┣ 📂 api
   ┗ fragments // API Endpoint + Headers
   ┗ key-factory // ReactQuery Key Object
   ┗ service // 디렉토리 개별 [queryFn,mutationFn]
┣ 📂 app
┃  ┗ (pages)
┣ 📂 components
┃  ┣ base // 기본적인 Base 컴포넌트
┃  ┣ features // 비즈니스 로직이 포함된 유기적 결합체 컴포넌트
┃  ┗ ui //shadcn 컴포넌트 원본
┣ 📂 hooks // React Hooks
┣ 📂 store // 상태관리 Store
┣ 📂 styles // global,theme Style
┣ 📂 utils // 유틸함수

```
