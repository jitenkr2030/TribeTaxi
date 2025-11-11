import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.city.deleteMany()
  await prisma.fareSettings.deleteMany()
  await prisma.ride.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.driver.deleteMany()
  await prisma.user.deleteMany()

  // Seed cities
  const cities = await Promise.all([
    prisma.city.create({
      data: {
        name: 'Ranchi',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 23.5,
          south: 23.1,
          east: 85.5,
          west: 85.0
        }
      }
    }),
    prisma.city.create({
      data: {
        name: 'Dhanbad',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 24.0,
          south: 23.6,
          east: 86.6,
          west: 86.2
        }
      }
    }),
    prisma.city.create({
      data: {
        name: 'Bokaro',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 23.4,
          south: 23.1,
          east: 86.3,
          west: 85.9
        }
      }
    }),
    prisma.city.create({
      data: {
        name: 'Deoghar',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 24.7,
          south: 24.2,
          east: 86.8,
          west: 86.5
        }
      }
    }),
    prisma.city.create({
      data: {
        name: 'Jamshedpur',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 23.0,
          south: 22.5,
          east: 86.3,
          west: 86.0
        }
      }
    }),
    // Phase 1 Expansion Cities
    prisma.city.create({
      data: {
        name: 'Hazaribagh',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 24.2,
          south: 23.7,
          east: 85.5,
          west: 85.1
        }
      }
    }),
    prisma.city.create({
      data: {
        name: 'Giridih',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 24.4,
          south: 23.9,
          east: 86.5,
          west: 86.1
        }
      }
    }),
    prisma.city.create({
      data: {
        name: 'Ramgarh',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 23.8,
          south: 23.4,
          east: 85.7,
          west: 85.3
        }
      }
    }),
    prisma.city.create({
      data: {
        name: 'Palamu',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 24.2,
          south: 23.8,
          east: 84.3,
          west: 83.8
        }
      }
    }),
    prisma.city.create({
      data: {
        name: 'Chatra',
        state: 'Jharkhand',
        isActive: true,
        bounds: {
          north: 24.4,
          south: 23.9,
          east: 85.1,
          west: 84.6
        }
      }
    })
  ])

  console.log('✅ Cities seeded successfully')

  // Seed fare settings for each city
  const fareSettings = [
    // Ranchi
    { cityId: cities[0].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 30, perKmRate: 11, perMinRate: 1.5, minFare: 25 },
    { cityId: cities[0].id, vehicleType: 'CAR_ECONOMY', baseFare: 50, perKmRate: 15, perMinRate: 2, minFare: 40 },
    { cityId: cities[0].id, vehicleType: 'CAR_PREMIUM', baseFare: 80, perKmRate: 20, perMinRate: 3, minFare: 60 },
    { cityId: cities[0].id, vehicleType: 'BIKE', baseFare: 20, perKmRate: 8, perMinRate: 1, minFare: 15 },
    
    // Dhanbad
    { cityId: cities[1].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 25, perKmRate: 10, perMinRate: 1.2, minFare: 20 },
    { cityId: cities[1].id, vehicleType: 'CAR_ECONOMY', baseFare: 45, perKmRate: 14, perMinRate: 1.8, minFare: 35 },
    { cityId: cities[1].id, vehicleType: 'CAR_PREMIUM', baseFare: 75, perKmRate: 18, perMinRate: 2.5, minFare: 55 },
    { cityId: cities[1].id, vehicleType: 'BIKE', baseFare: 18, perKmRate: 7, perMinRate: 0.8, minFare: 12 },
    
    // Bokaro
    { cityId: cities[2].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 28, perKmRate: 10.5, perMinRate: 1.3, minFare: 22 },
    { cityId: cities[2].id, vehicleType: 'CAR_ECONOMY', baseFare: 48, perKmRate: 14.5, perMinRate: 1.9, minFare: 38 },
    { cityId: cities[2].id, vehicleType: 'CAR_PREMIUM', baseFare: 78, perKmRate: 19, perMinRate: 2.8, minFare: 58 },
    { cityId: cities[2].id, vehicleType: 'BIKE', baseFare: 19, perKmRate: 7.5, perMinRate: 0.9, minFare: 14 },
    
    // Deoghar
    { cityId: cities[3].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 22, perKmRate: 9, perMinRate: 1, minFare: 18 },
    { cityId: cities[3].id, vehicleType: 'CAR_ECONOMY', baseFare: 40, perKmRate: 12, perMinRate: 1.5, minFare: 30 },
    { cityId: cities[3].id, vehicleType: 'CAR_PREMIUM', baseFare: 65, perKmRate: 16, perMinRate: 2.2, minFare: 48 },
    { cityId: cities[3].id, vehicleType: 'BIKE', baseFare: 15, perKmRate: 6, perMinRate: 0.7, minFare: 10 },
    
    // Jamshedpur
    { cityId: cities[4].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 32, perKmRate: 12, perMinRate: 1.6, minFare: 28 },
    { cityId: cities[4].id, vehicleType: 'CAR_ECONOMY', baseFare: 55, perKmRate: 16, perMinRate: 2.2, minFare: 45 },
    { cityId: cities[4].id, vehicleType: 'CAR_PREMIUM', baseFare: 85, perKmRate: 22, perMinRate: 3.2, minFare: 65 },
    { cityId: cities[4].id, vehicleType: 'BIKE', baseFare: 22, perKmRate: 9, perMinRate: 1.1, minFare: 18 },
    
    // Hazaribagh
    { cityId: cities[5].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 26, perKmRate: 10.2, perMinRate: 1.4, minFare: 23 },
    { cityId: cities[5].id, vehicleType: 'CAR_ECONOMY', baseFare: 46, perKmRate: 14.2, perMinRate: 1.7, minFare: 36 },
    { cityId: cities[5].id, vehicleType: 'CAR_PREMIUM', baseFare: 76, perKmRate: 18.5, perMinRate: 2.6, minFare: 56 },
    { cityId: cities[5].id, vehicleType: 'BIKE', baseFare: 17, perKmRate: 7.2, perMinRate: 0.85, minFare: 13 },
    
    // Giridih
    { cityId: cities[6].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 24, perKmRate: 9.8, perMinRate: 1.3, minFare: 21 },
    { cityId: cities[6].id, vehicleType: 'CAR_ECONOMY', baseFare: 42, perKmRate: 13.8, perMinRate: 1.6, minFare: 32 },
    { cityId: cities[6].id, vehicleType: 'CAR_PREMIUM', baseFare: 72, perKmRate: 17.5, perMinRate: 2.4, minFare: 52 },
    { cityId: cities[6].id, vehicleType: 'BIKE', baseFare: 16, perKmRate: 6.8, perMinRate: 0.75, minFare: 11 },
    
    // Ramgarh
    { cityId: cities[7].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 25, perKmRate: 10, perMinRate: 1.35, minFare: 22 },
    { cityId: cities[7].id, vehicleType: 'CAR_ECONOMY', baseFare: 44, perKmRate: 14, perMinRate: 1.65, minFare: 34 },
    { cityId: cities[7].id, vehicleType: 'CAR_PREMIUM', baseFare: 74, perKmRate: 18, perMinRate: 2.5, minFare: 54 },
    { cityId: cities[7].id, vehicleType: 'BIKE', baseFare: 16.5, perKmRate: 7, perMinRate: 0.8, minFare: 12 },
    
    // Palamu
    { cityId: cities[8].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 20, perKmRate: 8.5, perMinRate: 1.1, minFare: 17 },
    { cityId: cities[8].id, vehicleType: 'CAR_ECONOMY', baseFare: 35, perKmRate: 11.5, perMinRate: 1.4, minFare: 26 },
    { cityId: cities[8].id, vehicleType: 'CAR_PREMIUM', baseFare: 60, perKmRate: 15, perMinRate: 2, minFare: 42 },
    { cityId: cities[8].id, vehicleType: 'BIKE', baseFare: 14, perKmRate: 6, perMinRate: 0.6, minFare: 9 },
    
    // Chatra
    { cityId: cities[9].id, vehicleType: 'AUTO_RICKSHAW', baseFare: 21, perKmRate: 8.8, perMinRate: 1.2, minFare: 18 },
    { cityId: cities[9].id, vehicleType: 'CAR_ECONOMY', baseFare: 38, perKmRate: 12.2, perMinRate: 1.5, minFare: 28 },
    { cityId: cities[9].id, vehicleType: 'CAR_PREMIUM', baseFare: 63, perKmRate: 15.8, perMinRate: 2.1, minFare: 45 },
    { cityId: cities[9].id, vehicleType: 'BIKE', baseFare: 15, perKmRate: 6.3, perMinRate: 0.65, minFare: 10 }
  ]

  await prisma.fareSettings.createMany({
    data: fareSettings
  })

  console.log('✅ Fare settings seeded successfully')

  // Seed demo users
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const demoUsers = await Promise.all([
    // Admin user
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@tribetaxi.com',
        phone: '+919876543210',
        role: 'ADMIN'
      }
    }),
    
    // Demo riders
    prisma.user.create({
      data: {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+919123456789',
        role: 'RIDER'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Priya Singh',
        email: 'priya@example.com',
        phone: '+919234567890',
        role: 'RIDER'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '+919345678901',
        role: 'RIDER'
      }
    }),
    
    // Demo drivers
    prisma.user.create({
      data: {
        name: 'Driver 1',
        email: 'driver1@tribetaxi.com',
        phone: '+919111111111',
        role: 'DRIVER'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Driver 2',
        email: 'driver2@tribetaxi.com',
        phone: '+919222222222',
        role: 'DRIVER'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Driver 3',
        email: 'driver3@tribetaxi.com',
        phone: '+919333333333',
        role: 'DRIVER'
      }
    })
  ])

  console.log('✅ Demo users seeded successfully')

  // Seed demo drivers
  const demoDrivers = await Promise.all([
    prisma.driver.create({
      data: {
        userId: demoUsers[4].id,
        licenseNo: 'DL123456789',
        isVerified: true,
        isOnline: true,
        currentLat: 23.3441,
        currentLng: 85.3096
      }
    }),
    prisma.driver.create({
      data: {
        userId: demoUsers[5].id,
        licenseNo: 'DL987654321',
        isVerified: true,
        isOnline: true,
        currentLat: 23.3441,
        currentLng: 85.3096
      }
    }),
    prisma.driver.create({
      data: {
        userId: demoUsers[6].id,
        licenseNo: 'DL456789123',
        isVerified: false,
        isOnline: false,
        currentLat: 23.3441,
        currentLng: 85.3096
      }
    })
  ])

  console.log('✅ Demo drivers seeded successfully')

  // Seed demo vehicles
  const demoVehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        driverId: demoDrivers[0].id,
        type: 'CAR_ECONOMY',
        make: 'Maruti',
        model: 'Swift',
        year: 2020,
        color: 'White',
        plateNo: 'JH01AB1234',
        capacity: 4,
        isAC: true
      }
    }),
    prisma.vehicle.create({
      data: {
        driverId: demoDrivers[1].id,
        type: 'AUTO_RICKSHAW',
        make: 'Bajaj',
        model: 'RE',
        year: 2019,
        color: 'Yellow',
        plateNo: 'JH01CD5678',
        capacity: 3,
        isAC: false
      }
    }),
    prisma.vehicle.create({
      data: {
        driverId: demoDrivers[2].id,
        type: 'BIKE',
        make: 'Hero',
        model: 'Splendor',
        year: 2021,
        color: 'Black',
        plateNo: 'JH01EF9012',
        capacity: 1,
        isAC: false
      }
    })
  ])

  console.log('✅ Demo vehicles seeded successfully')

  // Seed demo rides
  const demoRides = await Promise.all([
    // Completed ride
    prisma.ride.create({
      data: {
        riderId: demoUsers[1].id,
        driverId: demoDrivers[0].id,
        status: 'COMPLETED',
        pickupLat: 23.3441,
        pickupLng: 85.3096,
        pickupAddress: 'Ranchi Railway Station',
        dropLat: 23.3568,
        dropLng: 85.3312,
        dropAddress: 'Birsa Munda Airport',
        estimatedFare: 150,
        actualFare: 145,
        distance: 12.5,
        duration: 25,
        startedAt: new Date('2024-01-15T10:00:00'),
        completedAt: new Date('2024-01-15T10:25:00'),
        paymentMethod: 'CASH',
        paymentStatus: 'PAID'
      }
    }),
    
    // In-progress ride
    prisma.ride.create({
      data: {
        riderId: demoUsers[2].id,
        driverId: demoDrivers[1].id,
        status: 'IN_PROGRESS',
        pickupLat: 23.3441,
        pickupLng: 85.3096,
        pickupAddress: 'Main Road, Ranchi',
        dropLat: 23.3712,
        dropLng: 85.3356,
        dropAddress: 'Harmu Housing Colony',
        estimatedFare: 80,
        distance: 5.2,
        duration: 15,
        startedAt: new Date(),
        paymentMethod: 'UPI',
        paymentStatus: 'PENDING'
      }
    }),
    
    // Requested ride
    prisma.ride.create({
      data: {
        riderId: demoUsers[3].id,
        status: 'REQUESTED',
        pickupLat: 23.3441,
        pickupLng: 85.3096,
        pickupAddress: 'Albert Ekka Chowk',
        dropLat: 23.3896,
        dropLng: 85.3280,
        dropAddress: 'Kanke Road',
        estimatedFare: 120,
        paymentMethod: 'WALLET',
        paymentStatus: 'PENDING'
      }
    }),
    
    // Cancelled ride
    prisma.ride.create({
      data: {
        riderId: demoUsers[1].id,
        driverId: demoDrivers[0].id,
        status: 'CANCELLED',
        pickupLat: 23.3441,
        pickupLng: 85.3096,
        pickupAddress: 'Ranchi Club',
        dropLat: 23.3618,
        dropLng: 85.3228,
        dropAddress: 'Morabadi Ground',
        estimatedFare: 60,
        cancelledAt: new Date('2024-01-14T18:30:00'),
        paymentMethod: 'CARD',
        paymentStatus: 'REFUNDED'
      }
    })
  ])

  console.log('✅ Demo rides seeded successfully')
  console.log('🎉 Database seeding completed!')
  console.log('📊 Demo Data Summary:')
  console.log(`   - Cities: ${cities.length}`)
  console.log(`   - Fare Settings: ${fareSettings.length}`)
  console.log(`   - Users: ${demoUsers.length}`)
  console.log(`   - Drivers: ${demoDrivers.length}`)
  console.log(`   - Vehicles: ${demoVehicles.length}`)
  console.log(`   - Rides: ${demoRides.length}`)
  console.log('')
  console.log('🔑 Demo Login Credentials:')
  console.log('   Admin: admin@tribetaxi.com / password123')
  console.log('   Rider: rajesh@example.com / password123')
  console.log('   Driver: driver1@tribetaxi.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })