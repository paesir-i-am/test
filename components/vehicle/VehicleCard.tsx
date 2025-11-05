import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/types/vehicle';
import { Card, CardContent } from '@/components/ui/card';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <Link href={`/vehicles/${vehicle.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative w-full h-48 bg-muted">
          {vehicle.thumbnail_image ? (
            <Image
              src={vehicle.thumbnail_image}
              alt={vehicle.detail_model_name || `${vehicle.manufacturer.name} ${vehicle.model.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              이미지 없음
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {vehicle.manufacturer.name} {vehicle.model.name}
          </h3>
          {vehicle.detail_model_name && (
            <p className="text-sm text-muted-foreground mb-2">
              {vehicle.detail_model_name}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
            <span>{vehicle.year}년</span>
            <span>•</span>
            <span>{vehicle.mileage.toLocaleString()}km</span>
            <span>•</span>
            <span>{vehicle.region}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-primary">
              {formatPrice(vehicle.price)}원
            </p>
            <span className="text-xs text-muted-foreground">
              조회 {vehicle.view_count}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
