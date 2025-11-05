import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🖼️  Updating vehicle images...');

  // K5 2세대 이미지 업데이트
  const k5Vehicle = await prisma.vehicle.findFirst({
    where: { detail_model_name: 'K5 2세대' },
  });

  if (k5Vehicle) {
    await prisma.vehicleImage.updateMany({
      where: { vehicle_id: k5Vehicle.id, is_thumbnail: true },
      data: { image_url: '/images/vehicles/k5-2021.jpg' },
    });
    console.log('✅ Updated K5 image');
  }

  // 소나타 DN8 이미지 업데이트
  const sonataDN8 = await prisma.vehicle.findFirst({
    where: { detail_model_name: '소나타 DN8' },
  });

  if (sonataDN8) {
    await prisma.vehicleImage.updateMany({
      where: { vehicle_id: sonataDN8.id, is_thumbnail: true },
      data: { image_url: '/images/vehicles/sonata-dn8-2020.jpg' },
    });
    console.log('✅ Updated Sonata DN8 image');
  }

  // 소나타 뉴 라이즈 이미지 업데이트
  const sonataNewRise = await prisma.vehicle.findFirst({
    where: { detail_model_name: '소나타 뉴 라이즈' },
  });

  if (sonataNewRise) {
    await prisma.vehicleImage.updateMany({
      where: { vehicle_id: sonataNewRise.id, is_thumbnail: true },
      data: { image_url: '/images/vehicles/sonata-new-rise-2019.jpg' },
    });
    console.log('✅ Updated Sonata New Rise image');
  }

  console.log('🎉 Image update completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

