let idForPet = 1;
let idForOwner = 1;
let idForVet = 1;
let idForDiagnosis = 1;

const GENDER = {
  male: 'male',
  female: 'female',
};

class Pet {
  constructor(name, age, species, gender, breed = null) {
    this.petId = idForPet++;
    this.name = name;
    this.age = age;
    this.species = species;
    this.breed = breed;
    this.gender = gender;
  }
}

class Owner {
  constructor(name, surname, contactData) {
    this.ownerId = idForOwner++;
    this.name = name;
    this.surname = surname;
    this.contactData = contactData;
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet);
  }
}

class Vet {
  constructor(name, surname, contactData, specialisation, experience = null) {
    this.vetId = idForVet++;
    this.name = name;
    this.surname = surname;
    this.experience = experience;
    this.contactData = contactData;
    this.specialisation = specialisation;
    this.appointments = [];
  }

  addAppointment(appointment) {
    this.appointments.push(appointment);
  }
}

class Appointment {
  constructor(timestamp, pet, vet, reason = null) {
    if (!pet || !vet) throw new Error('Appointment needs pet and vet');

    this.timestamp = timestamp;
    this.petId = pet.petId;
    this.vetId = vet.vetId;
    this.reason = reason;

    this.compositeKey = `${this.timestamp}_${this.petId}_${this.vetId}`;
  }
}

class Diagnosis {
  constructor(isHealthy, description, appointment) {
    if (!appointment)
      throw new Error('There is no diagnosis without the appointment');

    this.diagnosidId = idForDiagnosis++;
    this.isHealthy = isHealthy;
    this.description = description;

    this.appointmentId = appointment.compositeKey;
  }
}

const me = new Owner(
  'Stas',
  'Oleksiichuk',
  '{"phone": "0978984730", "email": "stas.oleksiichuk88@gmail.com"}'
);

const myCat = new Pet('Lukash', 7, 'cat', GENDER.male, 'scottish');
const myDog = new Pet('Buba', 2, 'dog', GENDER.female);

me.addPet(myCat);
me.addPet(myDog);

const vet1 = new Vet(
  'Olena',
  'Shevchenko',
  '{"phone": "0677654321", "email": "olena@mail.com"}',
  'surgery',
  5
);

const vet2 = new Vet(
  'Serhiy',
  'Kovalenko',
  '{"phone": "0631122334", "email": "serhiy@mail.com"}',
  'dentistry',
  10
);

const appointment1 = new Appointment(
  '2025-09-28T10:00',
  myCat,
  vet1,
  'annual check-up'
);
const appointment2 = new Appointment('2025-09-28T11:00', myDog, vet2);
const appointment3 = new Appointment(
  '2025-09-28T12:00',
  myCat,
  vet2,
  'dental cleaning'
);

vet1.addAppointment(appointment1);
vet2.addAppointment(appointment2);
vet2.addAppointment(appointment3);

const diagnosis1 = new Diagnosis(true, 'Healthy', appointment1);
const diagnosis2 = new Diagnosis(false, 'Mild dental issues', appointment3);

console.log(me);
console.log(vet1, vet2);
console.log(appointment1, appointment2, appointment3);
console.log(diagnosis1, diagnosis2);
