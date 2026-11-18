type CreateWorkScheduleDTO = {
  provider_id: string;
  day: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
  start: number;
  end: number;
  disabled: boolean;
};

export default CreateWorkScheduleDTO;
