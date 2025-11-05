'use client';

import { useState, useEffect } from 'react';
import VehicleCard from '@/components/vehicle/VehicleCard';
import { Vehicle } from '@/types/vehicle';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    manufacturer_id: '',
    fuel_type: '',
  });

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filters.minPrice) params.append('min_price', filters.minPrice);
      if (filters.maxPrice) params.append('max_price', filters.maxPrice);
      if (filters.manufacturer_id) params.append('manufacturer_id', filters.manufacturer_id);
      if (filters.fuel_type) params.append('fuel_type', filters.fuel_type);

      const response = await api.get(`/vehicles?${params.toString()}`);
      if (response.data.success) {
        setVehicles(response.data.data.vehicles || []);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('차량 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVehicles();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">차량 둘러보기</h1>

      {/* 검색 및 필터 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>검색 및 필터</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="제조사, 모델명 검색"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                placeholder="최소 가격 (원)"
              />
              <Input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                placeholder="최대 가격 (원)"
              />
              <select
                value={filters.fuel_type}
                onChange={(e) => setFilters({ ...filters, fuel_type: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">연료 유형</option>
                <option value="gasoline">가솔린</option>
                <option value="diesel">디젤</option>
                <option value="hybrid">하이브리드</option>
                <option value="electric">전기</option>
                <option value="lpg">LPG</option>
              </select>
              <Button type="submit" className="w-full">검색</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 차량 목록 */}
      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">로딩 중...</p>
          </CardContent>
        </Card>
      ) : vehicles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">등록된 차량이 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
