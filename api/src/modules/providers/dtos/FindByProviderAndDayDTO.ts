type FindByProviderAndDayDTO = {
  providerId: string;
  day: 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';
};

export default FindByProviderAndDayDTO;
