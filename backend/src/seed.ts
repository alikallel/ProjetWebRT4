import { DataSource } from 'typeorm';
import { User, Gender, UserRole } from './auth/user.entity';
import { Event } from './event/entities/event.entity';
import { EventRegistration } from './event-registrations/entities/event-registration.entity/event-registration.entity';
import { Payment } from './payment/entities/payment.entity/payment.entity';
import { faker } from '@faker-js/faker';

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'eventplannerr',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
});

async function seedDatabase() {
  await dataSource.initialize();

  // Seed Users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new User();
    user.username = faker.person.fullName();
    user.gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
    user.birthdate = faker.date.past({ years: 30 });
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.role = faker.helpers.arrayElement([UserRole.USER, UserRole.EVENTMASTER]);
    users.push(user);
  }

  await dataSource.manager.save(users);
  console.log('Users seeded.');

  // Seed Events
  const events = [];
  for (let i = 0; i < 5; i++) {
    const event = new Event();
    event.title = faker.lorem.words(3);
    event.date = faker.date.future({ years: 1 }).toISOString();
    event.location = faker.location.city();
    event.description = faker.lorem.paragraph();
    event.price = parseFloat(faker.commerce.price());
    event.capacity = faker.number.int({ min: 10, max: 100 }); // Fixed this line
    event.organizer = faker.helpers.arrayElement(users).id;
    events.push(event);
  }

  await dataSource.manager.save(events);
  console.log('Events seeded.');

  // Seed Event Registrations
  const registrations = [];
  for (let i = 0; i < 10; i++) {
    const registration = new EventRegistration();
    registration.event_id = faker.helpers.arrayElement(events).id;
    registration.user_id = faker.helpers.arrayElement(users).id;
    registration.status = faker.helpers.arrayElement(['PENDING', 'PAID', 'CANCELLED', 'REFUNDED']);
    registration.registration_date = faker.date.past({ years: 1 });
    registration.amount = parseFloat(faker.commerce.price());
    registration.number_of_places = faker.number.int({ min: 1, max: 5 }); // Fixed this line
    registrations.push(registration);
  }

  await dataSource.manager.save(registrations);
  console.log('Event registrations seeded.');

  // Seed Payments
  const payments = [];
  for (let i = 0; i < 10; i++) {
    const payment = new Payment();
    payment.registration_id = faker.helpers.arrayElement(registrations).id;
    payment.amount = parseFloat(faker.commerce.price());
    payment.payment_date = faker.date.past({ years: 1 });
    payment.payment_id = faker.string.uuid(); // Fixed this line
    payment.payment_link = faker.internet.url();
    payment.status = faker.helpers.arrayElement(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']);
    payment.payer_name = faker.person.fullName();
    payment.payer_email = faker.internet.email();
    payment.payer_phone = faker.phone.number(); // Fixed this line
    payments.push(payment);
  }

  await dataSource.manager.save(payments);
  console.log('Payments seeded.');

  await dataSource.destroy();
  console.log('Database seeding completed.');
}

seedDatabase().catch((error) => console.error('Error seeding database', error));
