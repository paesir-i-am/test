import Link from 'next/link';
import VehicleCard from '@/components/vehicle/VehicleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { prisma } from '@/lib/prisma';
import { Vehicle } from '@/types/vehicle';
import Chatbot from '@/components/chat/Chatbot';

async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { status: 'approved' },
      take: 8,
      orderBy: { created_at: 'desc' },
      include: {
        manufacturer: true,
        model: true,
        images: {
          where: { is_thumbnail: true },
          take: 1,
        },
      },
    });

    return vehicles.map((vehicle): Vehicle => ({
      id: vehicle.id,
      seller_id: vehicle.seller_id,
      manufacturer: {
        id: vehicle.manufacturer.id,
        name: vehicle.manufacturer.name,
      },
      model: {
        id: vehicle.model.id,
        manufacturer_id: vehicle.model.manufacturer_id,
        name: vehicle.model.name,
      },
      detail_model_name: vehicle.detail_model_name || undefined,
      year: vehicle.year,
      mileage: vehicle.mileage,
      price: parseInt(vehicle.price),
      fuel_type: vehicle.fuel_type as Vehicle['fuel_type'],
      transmission: vehicle.transmission as Vehicle['transmission'],
      color: vehicle.color || undefined,
      region: vehicle.region,
      options: vehicle.options ? JSON.parse(vehicle.options) : [],
      accident_history: vehicle.accident_history,
      accident_details: vehicle.accident_details || undefined,
      repair_history: vehicle.repair_history || undefined,
      description: vehicle.description || undefined,
      vehicle_number: vehicle.vehicle_number || undefined,
      status: vehicle.status as Vehicle['status'],
      view_count: vehicle.view_count,
      thumbnail_image: vehicle.images[0]?.image_url,
      created_at: vehicle.created_at.toISOString(),
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('차량 목록 조회 에러:', error);
    return [];
  }
}

export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          신뢰할 수 있는 중고차 거래
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          투명한 정보와 쉬운 거래로 시작하는 중고차 구매
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/vehicles">차량 둘러보기</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/register">무료 회원가입</Link>
          </Button>
        </div>
      </section>

      {/* Search Section */}
      <section className="mb-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>차량 검색</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="text"
                placeholder="제조사, 모델명 검색"
              />
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="">가격대 선택</option>
                <option value="0-1000">1,000만원 이하</option>
                <option value="1000-3000">1,000만원 ~ 3,000만원</option>
                <option value="3000-5000">3,000만원 ~ 5,000만원</option>
                <option value="5000+">5,000만원 이상</option>
              </select>
              <Button>검색하기</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Featured Vehicles */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">인기 차량</h2>
          <Button asChild variant="link">
            <Link href="/vehicles">전체보기 →</Link>
          </Button>
        </div>
        
        {vehicles.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <p className="text-muted-foreground">등록된 차량이 없습니다.</p>
              <Button asChild>
                <Link href="/vehicles/register">첫 차량 등록하기</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </section>

      {/* 챗봇 */}
      <Chatbot />
    </div>
  );
}
