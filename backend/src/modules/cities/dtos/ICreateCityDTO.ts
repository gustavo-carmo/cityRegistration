import { ObjectID } from 'mongodb';

export default interface ICreateCityDTO {
  name: string;
  state_id: ObjectID;
}
