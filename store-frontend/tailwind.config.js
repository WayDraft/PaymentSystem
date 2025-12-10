// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // React 컴포넌트 파일을 모두 포함합니다.
  ],
  theme: {
    extend: {
      // 나중에 커스텀 색상(nbBrown 등)이나 폰트를 여기에 정의할 수 있습니다.
    },
  },
  plugins: [],
}