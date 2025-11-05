import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 제조사 데이터
  const manufacturers = [
    { name: '현대', name_en: 'Hyundai' },
    { name: '기아', name_en: 'Kia' },
    { name: '쉐보레', name_en: 'Chevrolet' },
    { name: '르노삼성', name_en: 'Renault Samsung' },
    { name: '쌍용', name_en: 'SsangYong' },
    { name: 'BMW', name_en: 'BMW' },
    { name: '벤츠', name_en: 'Mercedes-Benz' },
    { name: '아우디', name_en: 'Audi' },
    { name: '폭스바겐', name_en: 'Volkswagen' },
    { name: '도요타', name_en: 'Toyota' },
  ];

  const createdManufacturers = [];
  for (const manufacturer of manufacturers) {
    const created = await prisma.manufacturer.upsert({
      where: { name: manufacturer.name },
      update: {},
      create: manufacturer,
    });
    createdManufacturers.push(created);
  }

  console.log('✅ Seeded manufacturers');

  // 모델 데이터 추가
  const hyundai = createdManufacturers.find(m => m.name === '현대');
  const kia = createdManufacturers.find(m => m.name === '기아');
  const bmw = createdManufacturers.find(m => m.name === 'BMW');

  if (hyundai) {
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: hyundai.id, name: '소나타' } },
      update: {},
      create: { manufacturer_id: hyundai.id, name: '소나타', name_en: 'Sonata' },
    });
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: hyundai.id, name: '아반떼' } },
      update: {},
      create: { manufacturer_id: hyundai.id, name: '아반떼', name_en: 'Avante' },
    });
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: hyundai.id, name: '그랜저' } },
      update: {},
      create: { manufacturer_id: hyundai.id, name: '그랜저', name_en: 'Grandeur' },
    });
  }

  if (kia) {
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: kia.id, name: 'K5' } },
      update: {},
      create: { manufacturer_id: kia.id, name: 'K5', name_en: 'K5' },
    });
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: kia.id, name: 'K3' } },
      update: {},
      create: { manufacturer_id: kia.id, name: 'K3', name_en: 'K3' },
    });
  }

  if (bmw) {
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: bmw.id, name: '3시리즈' } },
      update: {},
      create: { manufacturer_id: bmw.id, name: '3시리즈', name_en: '3 Series' },
    });
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: bmw.id, name: '5시리즈' } },
      update: {},
      create: { manufacturer_id: bmw.id, name: '5시리즈', name_en: '5 Series' },
    });
  }

  console.log('✅ Seeded models');

  // 사용자 생성
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 관리자
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sooka.com' },
    update: {},
    create: {
      email: 'admin@sooka.com',
      password: hashedPassword,
      name: '관리자',
      role: 'admin',
    },
  });

  // 테스트 사용자들
  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@test.com' },
    update: {},
    create: {
      email: 'buyer@test.com',
      password: hashedPassword,
      name: '구매자',
      role: 'buyer',
      phone: '010-1234-5678',
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: 'seller@test.com' },
    update: {},
    create: {
      email: 'seller@test.com',
      password: hashedPassword,
      name: '판매자',
      role: 'seller',
      phone: '010-9876-5432',
    },
  });

  console.log('✅ Seeded users');

  // 차량 데이터 생성
  const sonataModel = await prisma.model.findFirst({
    where: { name: '소나타', manufacturer: { name: '현대' } },
    include: { manufacturer: true },
  });

  const k5Model = await prisma.model.findFirst({
    where: { name: 'K5', manufacturer: { name: '기아' } },
    include: { manufacturer: true },
  });

  if (sonataModel && seller) {
    const vehicle1 = await prisma.vehicle.create({
      data: {
        seller_id: seller.id,
        manufacturer_id: sonataModel.manufacturer_id,
        model_id: sonataModel.id,
        detail_model_name: '소나타 DN8',
        year: 2020,
        mileage: 50000,
        price: '25000000',
        fuel_type: 'gasoline',
        transmission: 'automatic',
        color: '흰색',
        region: '서울시 강남구',
        options: JSON.stringify(['선루프', '네비게이션', '후방카메라']),
        accident_history: false,
        description: '깨끗하게 관리된 차량입니다. 정기점검 완료했습니다.',
        status: 'approved',
        view_count: 150,
      },
    });

    await prisma.vehicleImage.create({
      data: {
        vehicle_id: vehicle1.id,
        image_url: '/images/vehicles/sonata-dn8-2020.jpg',
        image_order: 1,
        is_thumbnail: true,
      },
    });

    const vehicle2 = await prisma.vehicle.create({
      data: {
        seller_id: seller.id,
        manufacturer_id: sonataModel.manufacturer_id,
        model_id: sonataModel.id,
        detail_model_name: '소나타 뉴 라이즈',
        year: 2019,
        mileage: 60000,
        price: '22000000',
        fuel_type: 'gasoline',
        transmission: 'automatic',
        color: '검정색',
        region: '서울시 서초구',
        options: JSON.stringify(['선루프', '네비게이션']),
        accident_history: true,
        accident_details: '경미한 추돌사고 1회',
        repair_history: '정기점검 완료, 타이어 교체 완료',
        description: '사고 이력 있지만 완전 복구된 차량입니다.',
        status: 'approved',
        view_count: 89,
      },
    });

    await prisma.vehicleImage.create({
      data: {
        vehicle_id: vehicle2.id,
        image_url: '/images/vehicles/sonata-new-rise-2019.jpg',
        image_order: 1,
        is_thumbnail: true,
      },
    });
  }

  if (k5Model && seller) {
    const vehicle3 = await prisma.vehicle.create({
      data: {
        seller_id: seller.id,
        manufacturer_id: k5Model.manufacturer_id,
        model_id: k5Model.id,
        detail_model_name: 'K5 2세대',
        year: 2021,
        mileage: 30000,
        price: '28000000',
        fuel_type: 'gasoline',
        transmission: 'automatic',
        color: '회색',
        region: '경기도 성남시',
        options: JSON.stringify(['선루프', '네비게이션', '후방카메라', '스마트키']),
        accident_history: false,
        description: '저주행, 깨끗한 차량입니다.',
        status: 'approved',
        view_count: 234,
      },
    });

    await prisma.vehicleImage.create({
      data: {
        vehicle_id: vehicle3.id,
        image_url: '/images/vehicles/k5-2021.jpg',
        image_order: 1,
        is_thumbnail: true,
      },
    });
  }

  console.log('✅ Seeded vehicles');

  // 찜하기 데이터
  if (buyer && sonataModel) {
    const vehicle = await prisma.vehicle.findFirst({
      where: { detail_model_name: '소나타 DN8' },
    });

    if (vehicle) {
      await prisma.favorite.upsert({
        where: {
          user_id_vehicle_id: {
            user_id: buyer.id,
            vehicle_id: vehicle.id,
          },
        },
        update: {},
        create: {
          user_id: buyer.id,
          vehicle_id: vehicle.id,
        },
      });
    }
  }

  console.log('✅ Seeded favorites');

  console.log('🎉 Seeding completed!');
  console.log('\n📋 테스트 계정:');
  console.log('  - 관리자: admin@sooka.com / password123');
  console.log('  - 구매자: buyer@test.com / password123');
  console.log('  - 판매자: seller@test.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
