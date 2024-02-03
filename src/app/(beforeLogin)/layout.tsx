type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

// 패러렐 라우트는 layout.tsx에서 사용
// 패러렐 라우트가 modal로 전달됨
export default function beforeLayout({ children, modal }: Props) {
  return (
    <div>
      {/* i폴더에 있는 page.tsx, login폴더에 있는 page.tsx */}
      {children}
      {/* @modal 폴더에 있는 page.tsx */}
      {modal}
    </div>
  );
}

// 주소가 localhost:3000일 때는 children -> page.tsx, modal -> @modal/default.tsx
// 주소가 localhost:3000/i/flow/login일 때는 children -> i/flow/login/page.tsx, modal -> @modal/i/flow/login/page.tsx
