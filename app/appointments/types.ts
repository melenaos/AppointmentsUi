export type Appointment = {
  Id: string;
  ClientName: string;
  AppointmentTime: string;
  ServiceDurationMinutes: number;
};

export type CreateAppointment = {
  ClientName: string;
  AppointmentTime: string;
  ServiceDurationMinutes?: number;
};