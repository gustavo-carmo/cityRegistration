import { ObjectID } from 'mongodb';

export default interface IFindCityDTO {
  name?: string;
  state_id?: ObjectID;
}
