type FindByProviderAndDayDTO = {
  providerId: string;
  day: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
};

export default FindByProviderAndDayDTO;
