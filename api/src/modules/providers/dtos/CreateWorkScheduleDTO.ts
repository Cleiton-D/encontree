type CreateWorkScheduleDTO = {
  provider_id: string;
  day: 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';
  inicio: number;
  fim: number;
  disabled: boolean;
};

export default CreateWorkScheduleDTO;
