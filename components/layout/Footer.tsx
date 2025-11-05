import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">쑤카</h3>
            <p className="text-sm text-muted-foreground">
              신뢰할 수 있는 중고차 거래 플랫폼
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-sm">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vehicles" className="text-muted-foreground hover:text-foreground transition-colors">
                  차량 둘러보기
                </Link>
              </li>
              <li>
                <Link href="/vehicles/register" className="text-muted-foreground hover:text-foreground transition-colors">
                  차량 등록
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-sm">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  도움말
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-sm">약관</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 쑤카. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
