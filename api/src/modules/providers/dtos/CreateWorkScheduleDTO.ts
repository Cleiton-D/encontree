type CreateWorkScheduleDTO = {
  providerId: string;
  day: 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';
  inicio: number;
  fim: number;
};

export default CreateWorkScheduleDTO;
