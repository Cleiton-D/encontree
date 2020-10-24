type CreateWorkScheduleDTO = {
  provider_id: string;
  day: 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';
  start: number;
  end: number;
  disabled: boolean;
};

export default CreateWorkScheduleDTO;
