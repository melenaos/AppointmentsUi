export type Appointment = {
  Id: BigInt;
  ClientName: string;
  AppointmentTime: Date;
  ServiceDurationMinutes: number;
};

export type CreateAppointment = {
  ClientName: string;
  AppointmentTime: Date;
  ServiceDurationMinutes?: number;
};