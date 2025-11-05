import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const manufacturerId = searchParams.get('manufacturer_id');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const fuelType = searchParams.get('fuel_type');
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';

    const skip = (page - 1) * limit;

    // 필터 조건 구성
    const where: Prisma.VehicleWhereInput = {
      status: 'approved',
    };

    if (search) {
      where.OR = [
        { detail_model_name: { contains: search } },
        { manufacturer: { name: { contains: search } } },
        { model: { name: { contains: search } } },
      ];
    }

    if (manufacturerId) {
      where.manufacturer_id = parseInt(manufacturerId);
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = minPrice;
      }
      if (maxPrice) {
        where.price.lte = maxPrice;
      }
    }

    if (fuelType) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (where as any).fuel_type = fuelType;
    }

    // 정렬
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderBy: any = {};
    if (sort === 'price') {
      orderBy.price = order;
    } else if (sort === 'created_at') {
      orderBy.created_at = order;
    } else if (sort === 'mileage') {
      orderBy.mileage = order;
    } else if (sort === 'view_count') {
      orderBy.view_count = order;
    }

    // 차량 조회
    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          manufacturer: true,
          model: true,
          images: {
            where: { is_thumbnail: true },
            take: 1,
          },
        },
      }),
      prisma.vehicle.count({ where }),
    ]);

    // 응답 데이터 변환
    const vehiclesData = vehicles.map((vehicle) => ({
      id: vehicle.id,
      manufacturer: {
        id: vehicle.manufacturer.id,
        name: vehicle.manufacturer.name,
      },
      model: {
        id: vehicle.model.id,
        name: vehicle.model.name,
      },
      detail_model_name: vehicle.detail_model_name,
      year: vehicle.year,
      mileage: vehicle.mileage,
      price: parseInt(vehicle.price),
      fuel_type: vehicle.fuel_type,
      transmission: vehicle.transmission,
      color: vehicle.color,
      region: vehicle.region,
      options: vehicle.options ? JSON.parse(vehicle.options) : [],
      accident_history: vehicle.accident_history,
      description: vehicle.description,
      status: vehicle.status,
      view_count: vehicle.view_count,
      thumbnail_image: vehicle.images[0]?.image_url,
      created_at: vehicle.created_at.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        vehicles: vehiclesData,
        pagination: {
          page,
          limit,
          total,
          total_pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('차량 목록 조회 에러:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '차량 목록을 불러오는데 실패했습니다',
        },
      },
      { status: 500 }
    );
  }
}

