export type Appointment = {
  id: string;
  clientName: string;
  appointmentTime: string;
  serviceDurationMinutes: number;
};

export type CreateAppointment = {
  ClientName: string;
  AppointmentTime: string;
  ServiceDurationMinutes?: number;
};

export type AppointmentCreatedResponse = {
  id: string;
  message: string;
};

