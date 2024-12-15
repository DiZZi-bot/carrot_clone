import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
      },
      colors: {
        background: "#E7F2F5", // 베이지색 배경
        font: "#333333", // 어두운 회색 텍스트
        "secondary-font": "#777777",
        primary: "#1e90ff", // 푸른색 버튼
        "primary-hover": "#0065C4FF", // 버튼 호버 시 색상
        secondary: "#a9a9a9", // 회색 버튼
        "secondary-hover": "#696969", // 회색 버튼 호버 시 색상
        link: "#1e90ff", // 링크 색상
        "link-hover": "#0065C4FF", // 링크 호버 시 색상
        border: "#cccccc", // 테두리 색상
        "input-border": "#dcdcdc", // 입력창 테두리 색상
        "input-focus-border": "#1e90ff", // 입력창 포커스 시 테두리 색상
        error: "#FF1616FF", // 에러 메시지 색상
        success: "#248A24FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
