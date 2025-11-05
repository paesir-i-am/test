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
  const mercedes = createdManufacturers.find(m => m.name === '벤츠');
  const audi = createdManufacturers.find(m => m.name === '아우디');
  const toyota = createdManufacturers.find(m => m.name === '도요타');
  const volkswagen = createdManufacturers.find(m => m.name === '폭스바겐');
  const chevrolet = createdManufacturers.find(m => m.name === '쉐보레');

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
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: hyundai.id, name: '싼타페' } },
      update: {},
      create: { manufacturer_id: hyundai.id, name: '싼타페', name_en: 'Santa Fe' },
    });
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: hyundai.id, name: '투싼' } },
      update: {},
      create: { manufacturer_id: hyundai.id, name: '투싼', name_en: 'Tucson' },
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
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: kia.id, name: '캠리' } },
      update: {},
      create: { manufacturer_id: kia.id, name: '캠리', name_en: 'Carnival' },
    });
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: kia.id, name: '스포티지' } },
      update: {},
      create: { manufacturer_id: kia.id, name: '스포티지', name_en: 'Sportage' },
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
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: bmw.id, name: 'X5' } },
      update: {},
      create: { manufacturer_id: bmw.id, name: 'X5', name_en: 'X5' },
    });
  }

  if (mercedes) {
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: mercedes.id, name: 'C클래스' } },
      update: {},
      create: { manufacturer_id: mercedes.id, name: 'C클래스', name_en: 'C-Class' },
    });
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: mercedes.id, name: 'E클래스' } },
      update: {},
      create: { manufacturer_id: mercedes.id, name: 'E클래스', name_en: 'E-Class' },
    });
  }

  if (audi) {
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: audi.id, name: 'A4' } },
      update: {},
      create: { manufacturer_id: audi.id, name: 'A4', name_en: 'A4' },
    });
  }

  if (toyota) {
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: toyota.id, name: '캠리' } },
      update: {},
      create: { manufacturer_id: toyota.id, name: '캠리', name_en: 'Camry' },
    });
  }

  if (volkswagen) {
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: volkswagen.id, name: '골프' } },
      update: {},
      create: { manufacturer_id: volkswagen.id, name: '골프', name_en: 'Golf' },
    });
  }

  if (chevrolet) {
    await prisma.model.upsert({
      where: { manufacturer_id_name: { manufacturer_id: chevrolet.id, name: '트래버스' } },
      update: {},
      create: { manufacturer_id: chevrolet.id, name: '트래버스', name_en: 'Traverse' },
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
  const models = {
    sonata: await prisma.model.findFirst({
      where: { name: '소나타', manufacturer: { name: '현대' } },
      include: { manufacturer: true },
    }),
    avante: await prisma.model.findFirst({
      where: { name: '아반떼', manufacturer: { name: '현대' } },
      include: { manufacturer: true },
    }),
    grandeur: await prisma.model.findFirst({
      where: { name: '그랜저', manufacturer: { name: '현대' } },
      include: { manufacturer: true },
    }),
    santafe: await prisma.model.findFirst({
      where: { name: '싼타페', manufacturer: { name: '현대' } },
      include: { manufacturer: true },
    }),
    tucson: await prisma.model.findFirst({
      where: { name: '투싼', manufacturer: { name: '현대' } },
      include: { manufacturer: true },
    }),
    k5: await prisma.model.findFirst({
      where: { name: 'K5', manufacturer: { name: '기아' } },
      include: { manufacturer: true },
    }),
    k3: await prisma.model.findFirst({
      where: { name: 'K3', manufacturer: { name: '기아' } },
      include: { manufacturer: true },
    }),
    carnival: await prisma.model.findFirst({
      where: { name: '캠리', manufacturer: { name: '기아' } },
      include: { manufacturer: true },
    }),
    sportage: await prisma.model.findFirst({
      where: { name: '스포티지', manufacturer: { name: '기아' } },
      include: { manufacturer: true },
    }),
    bmw3: await prisma.model.findFirst({
      where: { name: '3시리즈', manufacturer: { name: 'BMW' } },
      include: { manufacturer: true },
    }),
    bmw5: await prisma.model.findFirst({
      where: { name: '5시리즈', manufacturer: { name: 'BMW' } },
      include: { manufacturer: true },
    }),
    bmwx5: await prisma.model.findFirst({
      where: { name: 'X5', manufacturer: { name: 'BMW' } },
      include: { manufacturer: true },
    }),
    cclass: await prisma.model.findFirst({
      where: { name: 'C클래스', manufacturer: { name: '벤츠' } },
      include: { manufacturer: true },
    }),
    eclass: await prisma.model.findFirst({
      where: { name: 'E클래스', manufacturer: { name: '벤츠' } },
      include: { manufacturer: true },
    }),
    a4: await prisma.model.findFirst({
      where: { name: 'A4', manufacturer: { name: '아우디' } },
      include: { manufacturer: true },
    }),
    camry: await prisma.model.findFirst({
      where: { name: '캠리', manufacturer: { name: '도요타' } },
      include: { manufacturer: true },
    }),
    golf: await prisma.model.findFirst({
      where: { name: '골프', manufacturer: { name: '폭스바겐' } },
      include: { manufacturer: true },
    }),
    traverse: await prisma.model.findFirst({
      where: { name: '트래버스', manufacturer: { name: '쉐보레' } },
      include: { manufacturer: true },
    }),
  };

  // 차량 데이터 배열
  const vehiclesData = [
    // 기존 3개
    { model: models.sonata, detail: '소나타 DN8', year: 2020, mileage: 50000, price: '25000000', fuel: 'gasoline', trans: 'automatic', color: '흰색', region: '서울시 강남구', options: ['선루프', '네비게이션', '후방카메라'], accident: false, desc: '깨끗하게 관리된 차량입니다. 정기점검 완료했습니다.', view: 150, image: '/images/vehicles/sonata-dn8-2020.jpg' },
    { model: models.sonata, detail: '소나타 뉴 라이즈', year: 2019, mileage: 60000, price: '22000000', fuel: 'gasoline', trans: 'automatic', color: '검정색', region: '서울시 서초구', options: ['선루프', '네비게이션'], accident: true, accidentDetails: '경미한 추돌사고 1회', repair: '정기점검 완료, 타이어 교체 완료', desc: '사고 이력 있지만 완전 복구된 차량입니다.', view: 89, image: '/images/vehicles/sonata-new-rise-2019.jpg' },
    { model: models.k5, detail: 'K5 2세대', year: 2021, mileage: 30000, price: '28000000', fuel: 'gasoline', trans: 'automatic', color: '회색', region: '경기도 성남시', options: ['선루프', '네비게이션', '후방카메라', '스마트키'], accident: false, desc: '저주행, 깨끗한 차량입니다.', view: 234, image: '/images/vehicles/k5-2021.jpg' },
    // 추가 17개
    { model: models.avante, detail: '아반떼 AD', year: 2022, mileage: 25000, price: '21000000', fuel: 'gasoline', trans: 'automatic', color: '은색', region: '서울시 송파구', options: ['네비게이션', '후방카메라', '스마트키'], accident: false, desc: '2022년식 신형 아반떼입니다. 저주행으로 상태가 매우 좋습니다.', view: 312, image: '/images/vehicles/default.jpg' },
    { model: models.grandeur, detail: '그랜저 IG', year: 2021, mileage: 40000, price: '32000000', fuel: 'gasoline', trans: 'automatic', color: '검정색', region: '서울시 강남구', options: ['선루프', '네비게이션', '후방카메라', '스마트키', '어라운드뷰'], accident: false, desc: '고급 옵션 풀옵션입니다. 정기점검 완료.', view: 456, image: '/images/vehicles/default.jpg' },
    { model: models.santafe, detail: '싼타페 TM', year: 2020, mileage: 55000, price: '31000000', fuel: 'diesel', trans: 'automatic', color: '회색', region: '경기도 수원시', options: ['선루프', '네비게이션', '후방카메라', '스마트키'], accident: false, desc: '디젤 엔진으로 연비가 좋습니다. 7인승 SUV입니다.', view: 278, image: '/images/vehicles/default.jpg' },
    { model: models.tucson, detail: '투싼 NX4', year: 2021, mileage: 35000, price: '27000000', fuel: 'gasoline', trans: 'automatic', color: '흰색', region: '서울시 강서구', options: ['선루프', '네비게이션', '후방카메라'], accident: false, desc: '컴팩트 SUV로 실용적입니다. 깨끗하게 관리했습니다.', view: 189, image: '/images/vehicles/default.jpg' },
    { model: models.k3, detail: 'K3 3세대', year: 2022, mileage: 20000, price: '19000000', fuel: 'gasoline', trans: 'automatic', color: '빨간색', region: '경기도 용인시', options: ['네비게이션', '후방카메라', '스마트키'], accident: false, desc: '2022년식 신형입니다. 저주행으로 상태 최상입니다.', view: 234, image: '/images/vehicles/default.jpg' },
    { model: models.carnival, detail: '캠리 4세대', year: 2021, mileage: 45000, price: '35000000', fuel: 'diesel', trans: 'automatic', color: '검정색', region: '서울시 영등포구', options: ['선루프', '네비게이션', '후방카메라', '스마트키', '전동식 사이드스텝'], accident: false, desc: '9인승 미니벤입니다. 가족용으로 최적입니다.', view: 567, image: '/images/vehicles/default.jpg' },
    { model: models.sportage, detail: '스포티지 NL', year: 2020, mileage: 60000, price: '26000000', fuel: 'diesel', trans: 'automatic', color: '회색', region: '경기도 고양시', options: ['선루프', '네비게이션', '후방카메라'], accident: false, desc: '디젤 엔진으로 연비가 우수합니다. 정기점검 완료.', view: 345, image: '/images/vehicles/default.jpg' },
    { model: models.bmw3, detail: '320d', year: 2021, mileage: 30000, price: '45000000', fuel: 'diesel', trans: 'automatic', color: '검정색', region: '서울시 강남구', options: ['선루프', '네비게이션', '후방카메라', '스마트키', '헤드업디스플레이'], accident: false, desc: 'BMW 3시리즈 디젤 모델입니다. 프리미엄 차량입니다.', view: 678, image: '/images/vehicles/default.jpg' },
    { model: models.bmw5, detail: '520d', year: 2020, mileage: 50000, price: '58000000', fuel: 'diesel', trans: 'automatic', color: '흰색', region: '서울시 서초구', options: ['선루프', '네비게이션', '후방카메라', '스마트키', '어라운드뷰', '헤드업디스플레이'], accident: false, desc: 'BMW 5시리즈 프리미엄 세단입니다. 완벽한 상태입니다.', view: 789, image: '/images/vehicles/default.jpg' },
    { model: models.bmwx5, detail: 'X5 xDrive30d', year: 2021, mileage: 35000, price: '85000000', fuel: 'diesel', trans: 'automatic', color: '검정색', region: '서울시 강남구', options: ['선루프', '네비게이션', '후방카메라', '스마트키', '어라운드뷰', '에어서스펜션'], accident: false, desc: 'BMW X5 프리미엄 SUV입니다. 최고급 옵션입니다.', view: 890, image: '/images/vehicles/default.jpg' },
    { model: models.cclass, detail: 'C200', year: 2022, mileage: 20000, price: '52000000', fuel: 'gasoline', trans: 'automatic', color: '은색', region: '서울시 강남구', options: ['선루프', '네비게이션', '후방카메라', '스마트키'], accident: false, desc: '벤츠 C클래스 신형입니다. 저주행으로 상태 최상입니다.', view: 654, image: '/images/vehicles/default.jpg' },
    { model: models.eclass, detail: 'E220d', year: 2021, mileage: 40000, price: '65000000', fuel: 'diesel', trans: 'automatic', color: '검정색', region: '서울시 서초구', options: ['선루프', '네비게이션', '후방카메라', '스마트키', '어라운드뷰'], accident: false, desc: '벤츠 E클래스 프리미엄 세단입니다. 고급 옵션 포함.', view: 567, image: '/images/vehicles/default.jpg' },
    { model: models.a4, detail: 'A4 45 TFSI', year: 2021, mileage: 35000, price: '48000000', fuel: 'gasoline', trans: 'automatic', color: '회색', region: '서울시 강남구', options: ['선루프', '네비게이션', '후방카메라', '스마트키'], accident: false, desc: '아우디 A4 고급 세단입니다. 깨끗하게 관리했습니다.', view: 432, image: '/images/vehicles/default.jpg' },
    { model: models.camry, detail: '캠리 하이브리드', year: 2022, mileage: 25000, price: '38000000', fuel: 'hybrid', trans: 'automatic', color: '흰색', region: '경기도 성남시', options: ['선루프', '네비게이션', '후방카메라', '스마트키'], accident: false, desc: '도요타 캠리 하이브리드입니다. 연비가 매우 우수합니다.', view: 321, image: '/images/vehicles/default.jpg' },
    { model: models.golf, detail: '골프 8세대', year: 2021, mileage: 40000, price: '24000000', fuel: 'gasoline', trans: 'automatic', color: '검정색', region: '서울시 마포구', options: ['네비게이션', '후방카메라', '스마트키'], accident: false, desc: '폭스바겐 골프 컴팩트 세단입니다. 실용적인 차량입니다.', view: 234, image: '/images/vehicles/default.jpg' },
    { model: models.traverse, detail: '트래버스 LT', year: 2020, mileage: 55000, price: '42000000', fuel: 'gasoline', trans: 'automatic', color: '회색', region: '경기도 부천시', options: ['선루프', '네비게이션', '후방카메라', '스마트키'], accident: false, desc: '쉐보레 트래버스 대형 SUV입니다. 7인승 가족용 차량입니다.', view: 198, image: '/images/vehicles/default.jpg' },
    { model: models.k5, detail: 'K5 3세대', year: 2022, mileage: 15000, price: '29000000', fuel: 'gasoline', trans: 'automatic', color: '은색', region: '서울시 강남구', options: ['선루프', '네비게이션', '후방카메라', '스마트키', '어라운드뷰'], accident: false, desc: '2022년식 신형 K5입니다. 초저주행으로 상태 최상입니다.', view: 456, image: '/images/vehicles/default.jpg' },
    { model: models.avante, detail: '아반떼 CN7', year: 2021, mileage: 45000, price: '20000000', fuel: 'gasoline', trans: 'automatic', color: '회색', region: '경기도 화성시', options: ['네비게이션', '후방카메라'], accident: false, desc: '아반떼 신형입니다. 깨끗하게 관리했습니다.', view: 267, image: '/images/vehicles/default.jpg' },
  ];

  // 차량 생성 함수
  const createVehicle = async (vehicleData: typeof vehiclesData[0]) => {
    if (!vehicleData.model || !seller) return null;

    const vehicle = await prisma.vehicle.create({
      data: {
        seller_id: seller.id,
        manufacturer_id: vehicleData.model.manufacturer_id,
        model_id: vehicleData.model.id,
        detail_model_name: vehicleData.detail,
        year: vehicleData.year,
        mileage: vehicleData.mileage,
        price: vehicleData.price,
        fuel_type: vehicleData.fuel,
        transmission: vehicleData.trans,
        color: vehicleData.color,
        region: vehicleData.region,
        options: JSON.stringify(vehicleData.options),
        accident_history: vehicleData.accident,
        accident_details: vehicleData.accidentDetails || null,
        repair_history: vehicleData.repair || null,
        description: vehicleData.desc,
        status: 'approved',
        view_count: vehicleData.view,
      },
    });

    await prisma.vehicleImage.create({
      data: {
        vehicle_id: vehicle.id,
        image_url: vehicleData.image,
        image_order: 1,
        is_thumbnail: true,
      },
    });

    return vehicle;
  };

  // 모든 차량 생성
  for (const vehicleData of vehiclesData) {
    await createVehicle(vehicleData);
  }

  console.log('✅ Seeded vehicles');

  // 찜하기 데이터
  if (buyer) {
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
